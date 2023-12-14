
const jobListing = require("../Models/joblistig");

exports.addJob = async (req, res) => {

    try {
      const {
        companyName,
        addLogoURL,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOffice,
        jobLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
        information,
      } = req.body;
  
      console.log(req.userId);
  
      const job = new jobListing({
        companyName,
        addLogoURL,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOffice,
        jobLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
        information,
        user: req.userId,
      });
  
      await job.save();
      res.status(201).json({
        success: true,
        message: "Job added Successfully",
      });
    } catch (error) {
     // next(new ErrorHandler(error.message, 500));
     //res.send("smtg went wrong")
     console.log(error.message)
     res.status(500).send("smtg wrong")
    }
  };
  



exports.editJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    } = req.body;

    const updatedFields = {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
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
      const { jobPosition, skillsRequired } = req.body;

      const jobs = await jobListing.find({
          $or: [
              { jobPosition: jobPosition },
              { skillsRequired: { $in: skillsRequired} }
          ]
      });

      if (!jobs || jobs.length === 0) {
          return next(new ErrorHandler("Jobs not found", 404));
      }

      res.status(200).json({
          success: true,
          jobs
      });
  } catch (error) {
      next(new ErrorHandler(error.message, 500));
  }
};
