const express = require("express");

const app = express();

const connectDB = require("./config/database")

const User = require("./Models/user");

app.use(express.json());

//Api's

app.post("/signup", async (req,res) =>{
    
    
    const userobj = req.body;
    
    //creating a new instance of the user model
    const user = new User(userobj);

    try
    {
       await user.save();
       res.send("User added Successfully");
    }
    catch(err)
    {
      res.status(400).send("Error was: " + err.message);
    }
    
})








connectDB().then(() => {
  console.log("Database connection established successfully!");

  app.listen(3000, () =>{
    console.log("Server is listening on port 3000...");
  });

})
.catch(err => {
  console.log("Database connection failed:", err);
});

