const express = require("express");
const {addJob,editJob,getSpecificJob,getJobDetails,getAllJobs} = require("../Controllers/jobs");
const isAuthenticated = require('../middleware/auth')


const jobRouter = express.Router();
jobRouter
  
  .post("/add-job", isAuthenticated,  addJob)
 

  .put('/editJob/:id', isAuthenticated , editJob)
  .get('/getSpecificJob',  getSpecificJob)

  .get('/jobs/:id',  getJobDetails)
  .get('/getalljobs', getAllJobs );

  module.exports = jobRouter;
