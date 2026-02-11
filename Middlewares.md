MiddleWares:-



Authentication
const adminAuth = (req,res,next) =>{
    console.log("Admin auth is getting checked.");
    const token="xyz";
    const isadmin=token==="xyz";
    
    if(!isadmin)
    {
        res.status(401).send("Unauthorized Access");
    }
    else
    {
        next();
    }
}

module.exports = {
    adminAuth
};






//app.js
const express = require("express");

const app = express();


const {adminAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);



app.get("/admin/getalldata",(req,res) =>{
    res.send("user data sent");
});


app.listen(3000, () =>{
  console.log("Server is listening on port 3000...");
});






//Error handling

app.get("/getuserdata", (req,res) =>{
    

    throw new Error("kcgmgfgc");
    res.send("data i sent");
})


//Error Handling
app.use("/", (err,req,res,next) =>{
    if(err)
    {
        res.status(500).send("Something went Wrong");
    }

})
