const express = require("express");

const profileRouter = express.Router();

const User = require("../Models/user");

const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");




//get profiles
profileRouter.get("/profile/view", userAuth,async(req,res) =>{ //first goes to userAuth and validation happens and next call then it comes here and executes 
   try{
   
   const user = req.user;
  
   res.send(user);
  }
  catch(err)
  {
    res.status(400).send("Error : " + err.message);
  }
})

profileRouter.patch("/profile/edit", userAuth, async(req,res) =>{
    try{
         
         if(!validateEditProfileData)
         {
            throw new Error("Invalid Edit Fields");
         }

         const loggedInUser = req.user;
         
         Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

         await loggedInUser.save();
         res.json({message:`${loggedInUser.firstName} your profile has been updated successfully!!!`,data : loggedInUser});
         
    }
    catch(err)
    {
        res.status(400).send("ERROR : " + err.message);
    }
})


module.exports = profileRouter;