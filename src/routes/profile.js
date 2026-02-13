const express = require("express");

const profileRouter = express.Router();

const User = require("../Models/user");

const {userAuth} = require("../middlewares/auth");




//get profiles
profileRouter.post("/profile", userAuth,async(req,res) =>{ //first goes to userAuth and validation happens and next call then it comes here and executes 
   try{
   
   const user = req.user;
  
   res.send(user);
  }
  catch(err)
  {
    res.status(400).send("Error : " + err.message);
  }
})




module.exports = profileRouter;