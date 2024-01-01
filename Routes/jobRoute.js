const express = require("express");
const {addJob,editJob,getSpecificJob,getJobDetails,getAllJobs} = require("../Controllers/jobs");
const isAuthenticated = require('../middleware/auth')


const jobRouter = express.Router();
jobRouter
  
  .post("/add-job", isAuthenticated, async (req, res) => await addJob(req, res))

  .put('/editJob/:id', isAuthenticated , editJob)
  .post('/getSpecificJob',  getSpecificJob)
  .get('/jobs/:id',  getJobDetails)
  .get('/getalljobs',getAllJobs );

  module.exports = jobRouter;
