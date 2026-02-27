const express = require("express");

const authRouter = express.Router();

const User = require("../Models/user");

const bcrypt = require("bcrypt");



const {validateSignUpData} = require("../utils/validation");     //import the class



//SignUp
authRouter.post("/signup", async (req,res) =>{
    
  try
    {
    //Validation
    validateSignUpData(req);
    

    const { firstName, lastName, emailId, password, photourl} = req.body;           //destructing the data from the request body

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password,10);        //10 salt rounds


    
    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      photourl,
    });



    const savedUser = await user.save();

      //Create a JWT Token
      const token = await savedUser.getJWT();
      

      //Add the token to cookiesand send the response back to user
      res.cookie("token",token, {
        expires: new Date(Date.now() + 8 * 3600000)
      });

    
       res.json({ message: "User added Successfully", data: savedUser });
    }
    catch(err)
    {
      res.status(400).send("Error : " + err.message);
    }
    
})


//Login API
authRouter.post("/login", async (req,res) =>{
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
      const token = await user.getJWT();
      

      //Add the token to cookiesand send the response back to user
      res.cookie("token",token); 
      res.send(user);
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


//Logout Api
authRouter.post("/logout", async(req,res) =>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });

    res.send("Logout Successful!!");
})


module.exports = authRouter;
