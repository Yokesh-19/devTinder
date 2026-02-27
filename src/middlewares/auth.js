const User = require("../Models/user");

const jwt =require("jsonwebtoken");




const userAuth = async(req,res,next) =>{

    //read the token from the request cookies and validate the token and find the user
    try{
        const cookies = req.cookies;
    
       const {token} = cookies;

       if(!token)
       {
        return res.status(401).send("Please Login!");
       }
    
       const decodedMessage = jwt.verify(token,"YokeshHashedInEmployee@2026");
    
       const {_id} = decodedMessage;
    
       const user = await User.findById(_id);
       if(!user)
       {
        throw new Error("User not found");
       }

       req.user = user;        //attaching the user object to the request object,so it can be used in the next middleware
    
       next();
      }
      catch(err)
      {
        res.status(400).send("Error : " + err.message);
      }
    
}


module.exports = {
    userAuth
};