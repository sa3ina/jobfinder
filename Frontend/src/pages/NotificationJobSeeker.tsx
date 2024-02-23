import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  askForInterview,
  fetchDataa,
  rejectJobseeker,
} from "../redux/slices/EmployerSlice";
import { fetchJobs } from "../redux/slices/JobsSlice";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { fetchData } from "../redux/slices/JobseekerSlice";
import { applyForJob } from "../redux/slices/EmployerSlice";
type Props = {};

const NotificationJobSeeker = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobseekerInfo, setJobseekerInfo] = useState({});
  const { employers, loading, error } = useSelector(
    (state: RootState) => state.employers
  );
  const { jobseekers } = useSelector((state: RootState) => state.jobseekers);
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const login = JSON.parse(localStorage.getItem("login") || "{}");
  const userInfo = jobseekers.find((elem) => elem.id === login.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataa());
    dispatch(fetchJobs());
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.notifications) {
      const jobseekerData = {};
      userInfo.notifications.forEach((elem) => {
        const jobseekerinfo = jobseekers.find(
          (item) => item.email === elem.jobSeekerEmail
        );
        jobseekerData[elem.jobId] = jobseekerinfo;
      });
      setJobseekerInfo(jobseekerData);
    }
  }, [userInfo, jobseekers]);

  return (
    <div className="notificationemp">
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} className="rightside">
          {employers.map((employer) =>
            employer.notifications.map((notification) => {
              if (notification.jobSeekerEmail === userInfo?.email) {
                const job = jobs.find((job) => job.id === notification.jobId);
                if (notification.status === "pending") return null;
                if (job) {
                  return (
                    <div className="jobs" key={job.id}>
                      <div className="jobscont">
                        <div className="container">
                          <div className="status">
                            <p className="stat">{notification.status}</p>
                          </div>
                          <div className="inf">
                            <p className="type">
                              {employer.email}{" "}
                              {notification.status === "interview"
                                ? " has requested an interview for the job opportunity."
                                : notification.status === "hired"
                                ? "Congratulations! You have been hired for the job."
                                : " your application has been unsuccessful."}
                            </p>
                            <p className="type">{job.title}</p>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default NotificationJobSeeker;
