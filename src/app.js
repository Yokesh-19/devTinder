const express = require("express");

const app = express();




app.use("/user",
    (req,res,next) =>{
    //Route handler
    console.log("handling route user");
    res.send("Response1");
    next();
},
(req,res) =>{
  console.log("Handling 1");
  res.send("Response2");
}
);


app.listen(3000, () =>{
  console.log("Server is listening on port 3000..."); 
});
