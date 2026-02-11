const express = require("express");

const app = express();


app.get("/user/:userId/:name/:password", (req,res) =>{
    console.log(req.params);         //just an arrow function
    res.send({firstname:"Yokesh",lastname:"Manoharan"})
})


app.listen(3000, () =>{
  console.log("Server is listening on port 3000..."); 
});
