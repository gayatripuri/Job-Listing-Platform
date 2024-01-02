const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
 require("dotenv").config();
const mongoose = require("mongoose");


const authRouter = require("./Routes/authenticationRoute");
const jobRouter = require("./Routes/jobRoute");

const app = express();
app.use(cors({origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(res);
  res.json({ status: "Success" });
});

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