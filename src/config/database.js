const mongoose = require("mongoose");


const connectDB = async () =>{
   await mongoose.connect(
  "mongodb://yyokesh2004_db_user:Yokesh192004@" +
  "ac-0nscxgl-shard-00-00.bm39guh.mongodb.net:27017," +
  "ac-0nscxgl-shard-00-01.bm39guh.mongodb.net:27017," +
  "ac-0nscxgl-shard-00-02.bm39guh.mongodb.net:27017/" +
  "devTinder?ssl=true&replicaSet=atlas-73awcf-shard-0&authSource=admin&retryWrites=true&w=majority"
)
};



module.exports = connectDB;
