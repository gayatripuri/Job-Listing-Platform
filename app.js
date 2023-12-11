const express = require("express");
const bodyParser = require("body-parser");

 require("dotenv").config();
const mongoose = require("mongoose");


const authRouter = require("./Routes/authenticationRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Health check endpoint
app.get("/health", (req, res) => {
    console.log("started")
  res.send("all ok")
});

app.use("/", authRouter);


  
module.exports = app;