const express = require("express");

const app = express();

const connectDB = require("./config/database")

const User = require("./Models/user");

app.use(express.json());   //middleware to parse JSON request bodies



//Api's

app.post("/signup", async (req,res) =>{
    
    
    const userobj = req.body;
    
    //creating a new instance of the user model
    const user = new User(userobj);

    try
    {
       await user.save();
       res.send("User added Successfully");
    }
    catch(err)
    {
      res.status(400).send("Error was: " + err.message);
    }
    
})


//GET user by email
app.get("/user", async (req,res) =>{
   const userEmail = req.body.emailId;

   try{
    const user = await User.findOne({emailId: userEmail});
    if(user.length ===0)
    {
      res.status(404).send("user not found");
    }
    else{
      res.send(user);
    }
   }
   catch{
    res.status(400).send("Error was: " + err.message);
   }

});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req,res) =>{
    
    try{
       const users = await User.find({});          //empty filter...that gets you all
       if(users.length ===0)
       {
         res.status(404).send("No users found");
       }
       else{
         res.send(users);
       }
    }
    catch(err)
    {
      res.status(400).send("Error was: " + err.message);
    }
})


//Delete a user by Id
app.delete("/delete" , async(req,res) =>{
    const userId=req.body._id;

    try{
      const user = await User.findByIdAndDelete(userId);
      if(user)
      {
        res.send("user deleted successfully");
        res.send(user);
      }
      else
      {
        res.status(404).send("user not found");
      }
    }
    catch(err)
    {
      res.status(400).send("Error was: " + err.message);
    }
})


//Update data of the user
app.patch("/user/:userId", async(req,res) =>{
  const userId = req.params?.userId;        //this you send in postman....so you can keep any name for it[userId]
  const data= req.body;                  //data you wish to update.

  try{
      
     //API validation
     const ALLOWED_UPDATES = ["userID","photoUrl","skills","gender","age",];

     const isUpdateAllowed = Object.keys(data).every((k) =>
       ALLOWED_UPDATES.includes(k)
    );

    if(!isUpdateAllowed)
    {
      throw new Error("Update not allowed");
    }

    if(data.skills.length >10)
    {
       throw new Error("Skills cannot be more than 10");
    }

     const user = await User.findByIdAndUpdate({_id:userId},data, {
           runValidators: true,
     });
     if(user)
     {
      res.send("User updated successfully");
      // res.send(user);
     }
     else{
         res.status(404).send("user not found");
     }
  }
  catch(err)
  {
    res.status(400).send("Error was: " + err.message);
  }

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

