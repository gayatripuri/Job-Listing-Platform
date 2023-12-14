const express = require("express");
const bodyParser = require("body-parser");

 require("dotenv").config();
const mongoose = require("mongoose");


const authRouter = require("./Routes/authenticationRoute");
const jobRouter = require("./routes/jobRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Health check endpoint
app.get("/health", (req, res) => {
    console.log("started")
  res.send("all ok")
});

app.use("/", authRouter);
app.use("/", jobRouter);


// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Something went wrong! Please try again later." });
});
  
module.exports = app;