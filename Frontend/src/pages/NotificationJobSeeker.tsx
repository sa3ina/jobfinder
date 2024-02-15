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

  const handleOpen = (jobId) => {
    setOpen(true);
    setSelectedJobId(jobId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJobId(null);
  };

  const handleAskForInterview = (jobId, jobSeekerEmail) => {
    dispatch(
      askForInterview({
        employerEmail: userInfo.email,
        jobId: jobId,
        jobSeekerEmail: jobSeekerEmail,
        status: "interview",
      })
    );
    const jobseekerInfo = jobseekers.find(
      (item) => item.email === jobSeekerEmail
    );
    setJobseekerInfo((prevJobseekerInfo) => ({
      ...prevJobseekerInfo,
      [jobId]: jobseekerInfo,
    }));
  };
  const handleRejectJobseeker = (jobId, jobSeekerEmail) => {
    dispatch(
      rejectJobseeker({
        employerEmail: userInfo.email,
        jobId: jobId,
        jobSeekerEmail: jobSeekerEmail,
        status: "interview",
      })
    );
    const jobseekerInfo = jobseekers.find(
      (item) => item.email === jobSeekerEmail
    );
    setJobseekerInfo((prevJobseekerInfo) => ({
      ...prevJobseekerInfo,
      [jobId]: jobseekerInfo,
    }));
  };
  return (
    <div className="notificationemp">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 4,
            fontFamily: "Outfit",
          }}
        >
          <div className="modal">
            <p className="text">
              First Name: {jobseekerInfo[selectedJobId]?.firstname}
            </p>
            <p className="text">
              Last Name: {jobseekerInfo[selectedJobId]?.lastname}
            </p>
            <p className="text">
              Education: {jobseekerInfo[selectedJobId]?.education}
            </p>
            <p className="text">City: {jobseekerInfo[selectedJobId]?.city}</p>
            <p className="text">
              Open for remote job:{" "}
              {jobseekerInfo[selectedJobId]?.remote ? "Yes" : "No"}
            </p>
            <p className="text">
              Experience: {jobseekerInfo[selectedJobId]?.experience}
            </p>
            <p className="text">About: {jobseekerInfo[selectedJobId]?.about}</p>
          </div>
        </Box>
      </Modal>

      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} className="rightside">
          {employers.map((employer) =>
            employer.notifications.map((notification) => {
              if (notification.jobSeekerEmail === userInfo?.email) {
                const job = jobs.find((job) => job.id === notification.jobId);
                if (notification.status === "pending") return null;
                if (job) {
                  return (
                    <div
                      className="jobs"
                      key={job.id}
                      onClick={() => handleOpen(job.id)}
                    >
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
                                : " your application has been unsuccessful."}{" "}
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
