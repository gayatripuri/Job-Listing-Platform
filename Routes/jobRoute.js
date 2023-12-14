const express = require("express");
const {addJob,editJob,getSpecificJob } = require("../Controllers/jobs");
const isAuthenticated = require('../middleware/auth')


const jobRouter = express.Router();
jobRouter
  
  .post("/add-job", isAuthenticated, async (req, res) => await addJob(req, res))

  .put('/editJob/:id', isAuthenticated , editJob)
  .post('/getSpecificJob', isAuthenticated , getSpecificJob)

  module.exports = jobRouter;
