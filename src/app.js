const express = require("express");

const app = express();

const connectDB = require("./config/database")

const User = require("./Models/user");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const {userAuth} = require("./middlewares/auth");

app.use(express.json());   //middleware to parse JSON request bodies
app.use(cookieParser()); 

const {validateSignUpData} = require("./utils/validation");     //import the class

const bcrypt = require("bcrypt");




//Api's

//SignUp
app.post("/signup", async (req,res) =>{
    
  try
    {
    //Validation
    validateSignUpData(req);
    

    const { firstName, lastName, emailId, password} = req.body;           //destructing the data from the request body

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password,10);        //10 salt rounds


    
    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    
       await user.save();
       res.send("User added Successfully");
    }
    catch(err)
    {
      res.status(400).send("Error : " + err.message);
    }
    
})


//Login API
app.post("/login", async (req,res) =>{
  try{
    const data = req.body;
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId:emailId});

    if(!user)
    {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid)
    {

      //Create a JWT Token
      const token = await user.getJWT();     //hiding the userid inside the token
      console.log(token);


      //Add the token to cookiesand send the response back to user
      res.cookie("token",token);
      res.send("Login Successful!!");
    }
    else
    {
      throw new Error("Invalid Credentials");
    }

  }
  catch(err)
  {
    res.status(400).send("Error : " + err.message);
  }
})


//get profiles
app.post("/profile", userAuth,async(req,res) =>{ //first goes to userAuth and validation happens and next call then it comes here and executes 
   try{
   
   const user = req.user;
  
   res.send(user);
  }
  catch(err)
  {
    res.status(400).send("Error : " + err.message);
  }
})


app.get("/sendconnectionrequest",userAuth, (req,res) =>{

  res.send("connection request sent by: "+ req.user.firstName);

  console.log("sent");
  res.send("connection sent!!");
})






connectDB().then(() => {
  console.log("Database connection established successfully!");

  app.listen(3000, () =>{
    console.log("Server is listening on port 3000...");
  });

})
.catch(err => {
  console.log("Database connection failed:", err);
});

