const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/tapop");
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("connected to db successfully ");
});

connection.on("error", (err) => {
  console.log(err);
});

app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log("server started");
});
