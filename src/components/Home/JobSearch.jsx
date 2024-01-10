import React, { useCallback, useState ,useEffect} from "react";
import "./JobSearch.css";
import searchIcon from "../../assets/logo/searchIcon.png";
import useJobContext from "../../hooks/useJobContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import skills from "../../constants/skillOptions";
import BASEURL from "../../constants/baseurl";

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { loggedIn, setJobListings } = useJobContext();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
   
  };
  useEffect(()=>{
    getJobListings(searchTerm, selectedSkills);
  },[searchTerm,selectedSkills.length])
  const handleSelectChange = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      getJobListings(searchTerm, updatedSkills);
    }
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
    getJobListings(searchTerm, updatedSkills);
  };

  const clearSkills = () => {
    setSelectedSkills([]);
    getJobListings(searchTerm, []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search operation with the search term and selected skills
    console.log("Search Term:", searchTerm);
    console.log("Selected Skills:", selectedSkills);
  };

  const addJobButton = () => {
    navigate("/addJob");
  };

  const getJobListings = (_searchTerm, _selectedSkills) => {
    console.log(
      "_searchTerm:--",
      _searchTerm,
      "_selectedSkills:----",
      _selectedSkills
    );

    axios
      .get(`${BASEURL}/getSpecificJob`, {
        params: {
          searchTerm: _searchTerm,
          skills: _selectedSkills.join(","),
        },
      })
      .then((response) => {
        console.log(response.data);
        setJobListings(response.data.jobs);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  // const getJobListings = useCallback(

  //   debounce((_searchTerm, _selectedSkills) => {
  //     axios
  //       .get(`${BASEURL}/getSpecificJob`, {
  //         params: {
  //           searchTerm: _searchTerm,
  //           skills: _selectedSkills.join(","),
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         setJobListings(response.data.jobListings);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data: ", error);
  //       });
  //   }, 200),
  //   []

  // );

  return (
    <div className="job-search">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <div className="search-bar">
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            placeholder="Type any job title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      <div className="job__search__footer">
        <div className="select-skills">
          <select
            value={selectedSkills.length > 0 ? selectedSkills[0] : ""}
            onChange={handleSelectChange}
          >
            <option value="">Select Skill</option>
            {skills.map((skill, index) => (
              <option key={index}>{skill}</option>
            ))}
          </select>

          <div className="selected-skills">
            {selectedSkills.map((skill) => (
              <div className="selected-skill" key={skill}>
                {skill}
                <button
                  className="remove-skill"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <button className="clear__skills" onClick={clearSkills}>
              Clear
            </button>
          )}
        </div>

        {loggedIn && (
          <button className="add__job__btn" onClick={addJobButton}>
            + Add Job
          </button>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
