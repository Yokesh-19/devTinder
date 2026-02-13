const express = require("express");

const app = express();

const connectDB = require("./config/database")

const cookieParser = require("cookie-parser");

app.use(express.json());   //middleware to parse JSON request bodies
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);










//Api's









connectDB().then(() => {
  console.log("Database connection established successfully!");

  app.listen(3000, () =>{
    console.log("Server is listening on port 3000...");
  });

})
.catch(err => {
  console.log("Database connection failed:", err);
});

