import React, { useState, useEffect } from "react";
import style from "./AddJob.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BASEURL from "../../constants/baseurl";
// import useJobContext from "../../hooks/useJobContext";
import Jobimg from "../../assets/images/jobimg.png";

const AddJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [addLogoURL, setAddLogoURL] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [remoteOnsite, setRemoteOnsite] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);

  // const { loggedIn } = useJobContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent in the POST request
    const postData = {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired: skillsRequired.map((skill) => skill.trim()),
    };
    // console.log("postData", postData);

    // Send the POST request
    axios
      .post(`${BASEURL}/add-job`, postData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Job posting successful", response);
        setAboutCompany("");
        setAddLogoURL("");
        setCompanyName("");
        setJobDescription("");
        setJobLocation("");
        setJobPosition("");
        setJobType("");
        setMonthlySalary("");
        setRemoteOnsite("");
        setSkillsRequired([]);
        // Handle any success response if needed
        toast.success("Job posted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Unauthorized Access. Redirecting to home page", {
            position: "top-center",
            autoClose: 2000,
          });
          localStorage.clear();
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return;
        } else if (error.response.status === 400) {
          toast.error("Please provide all the fields!", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("Job posting failed!", {
            position: "top-center",
            autoClose: 2000,
          });
        }

        console.error("Job posting failed", error);
        // Handle any error response if needed
      });
    // console.log(postData);
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleRemoteOnsiteChange = (e) => {
    // console.log("Remote Onsite value:", e.target.value);
    setRemoteOnsite(e.target.value);
  };
  useEffect(() => {
    console.log("Remote Onsite state:", remoteOnsite);
  }, [remoteOnsite]);

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill);
    setSkillsRequired(skills);
  };

  const cancelAddJob = () => {
    toast.error("Job posting cancelled!", {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className={style.main}>
      <div className={style.left}>
        <h1>Add job description</h1>
        <div className={style.fieldinput}>
          <div className={style.company}>
            {" "}
            <label htmlFor="companyname">
              Company Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="companyname"
              placeholder="Enter your company name here"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className={style.url}>
            {" "}
            <label htmlFor="logourl">
              Add logo Url &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="logourl"
              placeholder="Enter the link"
              value={addLogoURL}
              onChange={(e) => setAddLogoURL(e.target.value)}
            />
          </div>
          <div className={style.position}>
            {" "}
            <label htmlFor="jobposition">
              Job Position &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="jobposition"
              placeholder="Enter Job Position"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>

          <div className={style.salary}>
            {" "}
            <label htmlFor="salary">
              Monthly salary &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="salary"
              placeholder="Enter amount in rupees"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          </div>

          <div className={style.jobtype}>
            {" "}
            <label htmlFor="jobtype">
              Job Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <select
              id="jobtype"
              name="jobtype"
              value={jobType}
              onChange={handleJobTypeChange}
            >
              <option value="Marketing">Marketing</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Customer support">Customer Support</option>
            </select>
          </div>

          <div className={style.remote}>
            {" "}
            <label htmlFor="remote">
              Remote/Office &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <select
              id="remote"
              name="remote"
              value={remoteOnsite}
              onChange={handleRemoteOnsiteChange}
            >
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className={style.location}>
            {" "}
            <label htmlFor="location">
              Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
            />
          </div>

          <div className={style.description}>
            {" "}
            <label htmlFor="description">
              Job Description &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              placeholder="Type job description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={style.about}>
            {" "}
            <label htmlFor="about">
              About Company &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <textarea
              id="about"
              name="aboutCompany"
              rows="4"
              cols="50"
              placeholder="Type about your company"
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
            ></textarea>
          </div>

          <div className={style.skill}>
            {" "}
            <label htmlFor="skill">
              Skill Required &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="skill"
              placeholder="Enter the must have skill"
              value={skillsRequired}
              onChange={handleSkillsChange}
            />
          </div>
        </div>
        <div className={style.button}>
          <button onClick={cancelAddJob}> Cancel</button>
          <button onClick={handleSubmit}>Add Job</button>
          <ToastContainer />
        </div>
      </div>

      <div className={style.right}>
        <h1>Recruiter add job details here</h1>
        <img src={Jobimg} alt="jobimg" />
      </div>
    </div>
  );
};

export default AddJob;
