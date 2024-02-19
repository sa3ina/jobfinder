import Grid from "@mui/material/Grid";
import React, { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../redux/slices/JobsSlice";
import { applyForJob } from "../redux/slices/EmployerSlice";
type Props = {};

const Detail = (props: Props) => {
  const { id } = useParams();
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const { employers } = useSelector((state: RootState) => state.employers);
  const { jobseekers } = useSelector((state: RootState) => state.jobseekers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, employers]);
  const job = jobs.find((elem) => elem.id === id);
  const similarJobs = jobs.filter(
    (elem) =>
      (elem.categories === job?.categories ||
        elem.location === job?.location) &&
      elem.id !== id
  );
  const login = JSON.parse(localStorage.getItem("login") || "{}");
  const userInfo = jobseekers.find((elem) => elem.email === login.email);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const isJobApplied = employers.some((employer) =>
    employer.notifications.some(
      (notification) =>
        notification.jobSeekerEmail === userInfo?.email &&
        notification.jobId === job.id
    )
  );
  console.log(isJobApplied);

  return (
    <div className="detail">
      <div className="image"></div>
      <div className="detailpage">
        <div className="jobsinfo">
          <div className="imagediv">
            <img src={job?.companylogo} alt="" />
          </div>
          <div className="detailjob">
            <p className="jobnamedetail">{job?.title}</p>
            <p className="companyname">{job?.companyname}</p>
          </div>
        </div>
        <Grid container className="detailgrid" spacing={5}>
          <Grid item lg={7} md={7} sm={12} xs={12} className="leftside">
            <div className="jobdesc">
              <p className="heading">Job Description</p>
              <p className="text">{job?.description}</p>
              <p className="heading">Job Category</p>
              <p className="text">{job?.categories}</p>
              <p className="heading">Job Benefits</p>
              {job?.benefits.map((elem) => {
                return <p className="textwithbullet">{elem}</p>;
              })}

              <p className="heading">Qualification</p>
              <p className="text">{job?.qualification}</p>
              <p className="heading">Company Email</p>
              <p className="text">{job?.companyemail}</p>
              <p className="heading">Company Contact</p>
              <p className="text">{job?.companycontact}</p>
              <p className="heading">Company Location</p>
              <p className="text">{job?.companylocation}</p>
              <p className="heading">Company Description</p>
              <p className="text">{job?.description}</p>
              <p className="heading">Company website</p>
              <p className="text">
                <a href={job?.companywebsite}>{job?.companywebsite}</a>
              </p>
            </div>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12} className="rightside">
            <div className="jobinfo">
              <p className="overview">Overview</p>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d35090828f95aacc7487_calendar.svg"
                    alt=""
                  />
                  <p className="question">Posted on:</p>
                </div>
                <p className="answer">January 18, 2023</p>
              </div>

              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                    alt=""
                  />
                  <p className="question">Location:</p>
                </div>
                <p className="answer">{job?.location}</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                    alt=""
                  />
                  <p className="question">Remote:</p>
                </div>
                <p className="answer">{job?.remote ? "Yes" : "No"}</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d5981d90ae2c2100db4b_bar-chart-line.svg"
                    alt=""
                  />
                  <p className="question">Level:</p>
                </div>
                <p className="answer">{job?.experience}</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d5ceca7c08854cbd4666_briefcase.svg"
                    alt=""
                  />
                  <p className="question">Department:</p>
                </div>
                <p className="answer">{job?.categories}</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d652823a1efb2120b66a_clock.svg"
                    alt=""
                  />
                  <p className="question">Time:</p>
                </div>
                <p className="answer">{job?.type}</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d610fd7a42d3fffb2221_cash-coin.svg"
                    alt=""
                  />
                  <p className="question">Salary:</p>
                </div>
                <p className="answer">{job?.salary}</p>
              </div>
              <button
                disabled={isJobApplied}
                onClick={() => {
                  dispatch(
                    applyForJob({
                      jobId: job.id,
                      jobSeekerEmail: login.email,
                      employerEmail: job.email,
                    })
                  );
                }}
              >
                {isJobApplied ? "Applied" : "Apply now"}
              </button>
            </div>
          </Grid>
        </Grid>{" "}
        <div className="similarjob">
          <p className="similar">Similar job openings</p>
          <div className="viewall">
            <Link to="/jobsgrid" className="link">
              <button className="view">View all jobs</button>
            </Link>

            <img
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63ddf30d1693d1f9dae4820f_arrow-right-royal-blue.svg"
              alt=""
            />
          </div>
        </div>
        <Grid container spacing={3}>
          {similarJobs.map((elem, i) => {
            return (
              <Grid item key={i} lg={4} md={4} sm={6} xs={12}>
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
      </div>
    </div>
  );
};

export default Detail;
