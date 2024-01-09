// Home.js
import React, { useEffect } from "react";
import "./Home.css";
import JobSearch from "./JobSearch";
import JobContainer from "./JobContainer";
import useJobContext from "../../hooks/useJobContext";
import axios from "axios";
import BASEURL from "../../constants/baseurl";

const Home = () => {
  const { loggedIn, setLoggedIn, setJobListings, setLoading } = useJobContext();

  useEffect(() => {
    localStorage.getItem("token") ? setLoggedIn(true) : setLoggedIn(false);
  }, [loggedIn, setLoggedIn]);

  const getJobListings = () => {
    setLoading(true);
    axios
      .get(`${BASEURL}/getalljobs`)
      .then((response) => {
        setJobListings(response.data.jobs);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // Handle error, e.g., show an error message to the user
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getJobListings();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home">
      <JobSearch />
      <div className="job-container">
        <JobContainer />
      </div>
    </div>
  );
};

export default Home;
