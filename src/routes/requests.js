const express = require("express");

const requestRouter = express.Router();

const User = require("../Models/user");

const {userAuth} = require("../middlewares/auth");



requestRouter.get("/sendconnectionrequest",userAuth, (req,res) =>{

  res.send("connection request sent by: "+ req.user.firstName);

  console.log("sent");
  res.send("connection sent!!");
})




module.exports = requestRouter;