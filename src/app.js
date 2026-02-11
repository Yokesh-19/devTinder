const express = require("express");

const app = express();



app.get("/getuserdata", (req,res) =>{
    
    try{

        throw new Error("kcgmgfgc");
        res.send("data is sent");
    }
    catch(err)
    {
        res.status(500).send("Something went Wrong");
    }

    
    res.send("data i sent");
})


//Error Handling
app.use("/", (err,req,res,next) =>{
    if(err)
    {
        res.status(500).send("Something went Wrong");
    }

})



app.listen(3000, () =>{
  console.log("Server is listening on port 3000...");
});
