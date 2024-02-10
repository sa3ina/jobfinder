import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../src/redux/slices/JobseekerSlice";
import { fetchJobs } from "../../src/redux/slices/JobsSlice";
type Props = {};

const ProfileJobSeeker = (props: Props) => {
  const { jobseekers, loading, error } = useSelector(
    (state: RootState) => state.jobseekers
  );
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchJobs());
  }, [dispatch]);
  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem("login") || "{}");
  const id = login.id;
  const userInfo = jobseekers.find((elem) => elem.id === id);
  jobs.map((elem) => {
    if (elem.email == userInfo?.email) {
      return console.log(elem);
    }
  });
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("login");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <div className="profilemployer">
        <Grid container className="findgrid" spacing={3}>
          <Grid item lg={4} md={4} sm={12} xs={12} className="leftside">
            <div className="form">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
              <div className="userinfo">
                <div className="namesurname">
                  <p className="text">{userInfo?.firstname}</p>
                  <p className="text">{userInfo?.lastname}</p>
                </div>
                <p className="text">{userInfo?.email}</p>
                <p className="text">{userInfo?.education}</p>
                <div className="namesurname">
                  <p className="text">City:</p>
                  <p className="text">{userInfo?.city}</p>
                </div>

                <div className="namesurname">
                  <p className="text">Job Preference:</p>
                  <p className="text">{userInfo?.jobpreference}</p>
                </div>

                <p className="text">{userInfo?.about}</p>
                <div className="namesurname">
                  <p className="text">Experience:</p>
                  <p className="text">{userInfo?.experience}</p>
                </div>
                <button onClick={handleLogout} className="logout">
                  logout
                </button>
              </div>
            </div>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12} className="rightside">
            <p className="posted">Jobs that you applied</p>
            {jobs.map((elem, i) => {
              if (elem.email == userInfo?.email) {
                return (
                  <div className="jobs">
                    <div className="jobscont">
                      <img src={elem.companylogo} alt="" className="jobicon" />
                      <div className="inf">
                        <p className="jobname">{elem.title}</p>
                        <div className="location">
                          <img
                            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                            alt=""
                          />
                          <p>{elem.location}</p>
                        </div>
                      </div>
                    </div>
                    <p className="type">{elem.type}</p>
                    <Link to={`/${elem?.id}`}>
                      <button>View job</button>
                    </Link>
                  </div>
                );
              }
            })}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProfileJobSeeker;
