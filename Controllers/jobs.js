
const jobListing = require("../Models/joblistig");

exports.addJob = async (req, res) => {

    try {
      const {
        companyName,
        addLogoURL,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOnsite,
        jobLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
        information,
      } = req.body;
  
      // console.log(req.body, 'req.body');
  
      const job = new jobListing({
        companyName,
        addLogoURL,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOnsite,
        jobLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
        information
      });

  console.log("job", job)

     await job.save();
      res.status(201).json({
        success: true,
        message: "Job added Successfully",
      });
    } catch (error) {
      //next(new ErrorHandler(error.message, 500));
     //res.send("smtg went wrong")
     console.log(error.message)
     res.status(500).send("smtg wrong")
    }
  };
  



exports.editJob = async (req, res) => {
  try {
    const { id } = req.params;
   // console.log("Received ID:", id);
    const {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    } = req.body;

    console.log("Received data:", req.body); 

    const updatedFields = {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    };

    const updatedJob = await jobListing.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );
    

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, message: "Job updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


exports.getSpecificJob = async (req, res, next) => {
  try {
    console.log(req.params, req.query, "reqst");
     // const { jobPosition, skillsRequired } = req.body;
      const skillsRequired=req.query.skills;
      const jobPosition=req.query.searchTerm;
      const jobs = await jobListing.find({
          $or: [
             { jobPosition: jobPosition },
              { skillsRequired: { $in: skillsRequired} }
          ]
      });
console.log(jobs,"jobs")
      if (!jobs || jobs.length === 0) {
        //  return next(new ErrorHandler("Jobs not found", 404));
        return res.status(404).send("jobs not found")
      }

      res.status(200).json({
          success: true,
          jobs
      });
  } catch (error) {
    console.log(error.message,"error");
    res.status(500).send("internal server error")
     // next(new ErrorHandler(error.message, 500));
  }
};



exports.getJobDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobListing.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


exports.getAllJobs = async (req, res, next) => {
  const jobs = await jobListing.find({})
  if(!jobs){
    return res.status(404).json({ success: false, message: "Job not found" });
  }
  res.status(200).json({
      success : true,
      jobs
  })
}