const express = require("express");

const app = express();


const {adminAuth} = require("./middlewares/auth");
const {userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);


app.get("/user",userAuth, (req,res) =>{
    res.send("data i sent");
})

app.get("/admin/getalldata",(req,res) =>{
    res.send("user data sent");
});


app.listen(3000, () =>{
  console.log("Server is listening on port 3000...");
});
