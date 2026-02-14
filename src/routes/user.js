const express = require("express");
const userRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require("../Models/connectionRequest");

const USER_SAFE_DATA= "firstName lastName age gender";


userRouter.get("/user/requests/received", userAuth, async(req,res) =>{
    try{

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",USER_SAFE_DATA);

        res.json({message:"Data fetched successfully!!",data:connectionRequests});

    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
})


userRouter.get("/user/connections", userAuth, async(req,res) =>{
    try{
            
        const loggedInUser = req.user;
        const connections = await ConnectionRequestModel.find({
            $or: [ {toUserId:loggedInUser._id,status:"accepted"}, 
                   {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connections.map((row) => 
        {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString())
            {
                return row.toUserId;
            }
                return row.fromUserId;
        });

        res.json({data});
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
})


module.exports = userRouter