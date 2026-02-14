const express = require("express");

const requestRouter = express.Router();

const User = require("../Models/user");

const {userAuth} = require("../middlewares/auth");

const ConnectionRequestModel = require("../Models/connectionRequest");


requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res) =>{

   try{

    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const Allowedstatus = ["interested","ignored"];

    if(!Allowedstatus.includes(status))
    {
      return res.status(400).json({message:"Invalid status type: " + status});
    }

    if(fromUserId.equals(toUserId))
    {
      return res.status(400).json({message:" You cannect with yourself!!"});
    }

    const toUser = await User.findOne({
      _id:toUserId,
    })

    if(!toUser)
    {
      throw new Error(`${toUserId} is Not Found`);
    }

    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId:toUserId, toUserId:fromUserId},
      ],
    });

    if(existingConnectionRequest)
    {
      return res.status(400).send({message:"Connection Request Already Exists!!!"})
    }


    const connectionRequest = new ConnectionRequestModel({
       fromUserId,
       toUserId,
       status,
    })

    const data = await connectionRequest.save();
    
    res.json({
      message:req.user.firstName+" is "+status+" in "+toUser.firstName,
      data,
    });
   }
   catch(err){
    res.status(400).json({
      message:"Error sending connection request",
      error: err.message,
    })
   }
})




module.exports = requestRouter;