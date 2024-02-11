import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../redux/slices/JobsSlice";
type Props = {};

const JobsGrid = (props: Props) => {
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRemote, setSelectedRemote] = useState(false);
  const filteredJobs = jobs.filter((job) => {
    if (selectedCategory && job.categories !== selectedCategory) {
      return false;
    }
    if (selectedLocation && job.location !== selectedLocation) {
      return false;
    }
    if (selectedJobType && job.type !== selectedJobType) {
      return false;
    }
    if (selectedCompany && job.companyname !== selectedCompany) {
      return false;
    }
    if (selectedRemote && !job.remote) {
      return false;
    }
    return true;
  });
  const handleReset = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedCompany("");
    setSelectedJobType("");
    setSelectedRemote(false);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleJobTypeClick = (jobType) => {
    setSelectedJobType(jobType);
  };
  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };
  const handleRemoteClick = () => {
    setSelectedRemote(true);
    setSelectedLocation("");
  };
  return (
    <div className="jobspage">
      <div className="jobsgrid">
        <p className="find">Jobs Grid</p>
        <p className="yet">
          Yet uncommonly his ten who diminution astonished. Demesne new manners
          savings staying had.
        </p>
      </div>
      <Grid container className="findgrid" spacing={3}>
        <Grid item lg={3} md={3} sm={12} xs={12} className="leftside">
          <div className="cont">
            <button onClick={handleReset} className="reset">
              Reset Filters
            </button>
            <p className="categ">Categories</p>
            <div
              className={`category ${
                selectedCategory === "Accounting"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCategoryClick("Accounting")}
            >
              <p className="name">Accounting</p>
            </div>
            <div
              className={`category ${
                selectedCategory === "Business & consulting"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCategoryClick("Business & consulting")}
            >
              <p className="name">Business & consulting</p>
            </div>
            <div
              className={`category ${
                selectedCategory === "Human research"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCategoryClick("Human research")}
            >
              <p className="name">Human research</p>
            </div>
            <div
              className={`category ${
                selectedCategory === "Marketing and finance"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCategoryClick("Marketing & finance")}
            >
              <p className="name">Marketing & finance</p>
            </div>
            <div
              className={`category ${
                selectedCategory === "Design & development"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCategoryClick("Design & development")}
            >
              <p className="name">Design & development</p>
            </div>
            <div
              className={`category ${
                selectedCategory === "Finance management"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCategoryClick("Tech & Programming")}
            >
              <p className="name">Tech & Programming</p>
            </div>
            <div
              className={`category ${
                selectedCategory === "Project management"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCategoryClick("Project management")}
            >
              <p className="name">Project management</p>
            </div>
            <div
              className={`category ${
                selectedCategory === "Customer services"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCategoryClick("Customer services")}
            >
              <p className="name">Customer services</p>
            </div>
          </div>
          <div className="cont">
            <p className="categ">Job type</p>
            <div
              className={`category ${
                selectedJobType === "Full time"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleJobTypeClick("Full time")}
            >
              <p className="name">Full time</p>
            </div>
            <div
              className={`category ${
                selectedJobType === "Part time"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleJobTypeClick("Part time")}
            >
              <p className="name">Part time</p>
            </div>
            <div
              className={`category ${
                selectedJobType === "Internship"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleJobTypeClick("Internship")}
            >
              <p className="name">Internship</p>
            </div>
            <div
              className={`category ${
                selectedJobType === "Temporary"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleJobTypeClick("Temporary")}
            >
              <p className="name">Temporary</p>
            </div>
          </div>
          <div>
            <p className="categ">Company</p>
            <div
              className={`category ${
                selectedCompany === "Amazon" ? "activeButton" : "inactiveButton"
              }`}
              onClick={() => handleCompanyClick("Amazon")}
            >
              <p className="name">Amazon</p>
            </div>
            <div
              className={`category ${
                selectedCompany === "Microsoft"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCompanyClick("Microsoft")}
            >
              <p className="name">Microsoft</p>
            </div>
            <div
              className={`category ${
                selectedCompany === "Apple" ? "activeButton" : "inactiveButton"
              }`}
              onClick={() => handleCompanyClick("Apple")}
            >
              <p className="name">Apple</p>
            </div>
            <div
              className={`category ${
                selectedCompany === "Netflix"
                  ? "activeButton"
                  : "inactiveButton"
              }`}
              onClick={() => handleCompanyClick("Netflix")}
            >
              <p className="name">Netflix</p>
            </div>
            <div
              className={`category ${
                selectedCompany === "Google" ? "activeButton" : "inactiveButton"
              }`}
              onClick={() => handleCompanyClick("Google")}
            >
              <p className="name">Google</p>
            </div>
            <div
              className={`category ${
                selectedCompany === "Tesla" ? "activeButton" : "inactiveButton"
              }`}
              onClick={() => handleCompanyClick("Tesla")}
            >
              <p className="name">Tesla</p>
            </div>
          </div>
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12} className="rightside">
          <Grid container spacing={3}>
            {filteredJobs.map((elem, i) => {
              return (
                <Grid item key={i} lg={6} md={6} sm={6} xs={12}>
                  <div className="jobs" key={i}>
                    <p className="intern">{elem.type}</p>
                    <p className="jobname">{elem.title}</p>
                    <div className="payment">
                      <div>
                        <p>{elem.salary}</p>
                      </div>
                      <p className="dot">.</p>
                      <p>{elem.experience}</p>
                    </div>
                    <div className="jobscontainer">
                      <img src={elem.companylogo} className="jobicon" />
                      <div className="inf">
                        <p className="jobname">{elem.companyname}</p>
                        <div className="location">
                          <img
                            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                            alt=""
                          />
                          <p>{elem.location}</p>
                        </div>
                      </div>
                    </div>
                    <Link to={`/${elem?.id}`} className="link width">
                      <button>View job</button>
                    </Link>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <div className="select">
        <p className="location">Select by Location</p>

        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <div className="locationcont" onClick={() => handleRemoteClick()}>
              <div className="image image1">
                <p>Remote</p>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <div
              className="locationcont"
              onClick={() => handleLocationClick("Tokyo, Japan")}
            >
              <div className="image image2">
                <p>Tokyo, Japan</p>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <div
              className="locationcont"
              onClick={() => handleLocationClick("London, UK")}
            >
              <div className="image image3">
                <p>London, UK</p>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <div
              className="locationcont"
              onClick={() => handleLocationClick("Mumbai, India")}
            >
              <div className="image image4">
                <p>Mumbai, India</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default JobsGrid;
