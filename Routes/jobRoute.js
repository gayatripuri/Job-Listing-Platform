const express = require("express");
const {addJob,editJob,getSpecificJob,getJobDetails} = require("../Controllers/jobs");
const isAuthenticated = require('../middleware/auth')


const jobRouter = express.Router();
jobRouter
  
  .post("/add-job", isAuthenticated, async (req, res) => await addJob(req, res))

  .put('/editJob/:id', isAuthenticated , editJob)
  .post('/getSpecificJob', isAuthenticated , getSpecificJob)
  .get('/jobs/:id',  isAuthenticated,getJobDetails);

  module.exports = jobRouter;
