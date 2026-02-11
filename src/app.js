const express = require("express");

const app = express();


//this will handle get call to /user
app.get("/user", (req,res) =>{              //just an arrow function
    res.send({firstname:"Yokesh",lastname:"Manoharan"})
})

//post call
app.post("/user", (req,res) =>{              //just an arrow function
    res.send("Data saved in Database");
})

//delete call
app.delete("/user", (req,res) =>{              //just an arrow function
    res.send("Deleted successfully!");
})


//this will match all the HTTP method API calls to /test
app.use("/test",(req,res) => {
    res.send("Hello from the Server!");
})

app.listen(3000, () =>{
  console.log("Server is listening on port 3000..."); 
});
