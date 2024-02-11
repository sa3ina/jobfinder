import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataa } from "../redux/slices/EmployerSlice";
import { fetchJobs } from "../redux/slices/JobsSlice";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { fetchData } from "../redux/slices/JobseekerSlice";

type Props = {};

const NotificationEmployer = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobseekerInfo, setJobseekerInfo] = useState({});
  const { employers, loading, error } = useSelector(
    (state: RootState) => state.employers
  );
  const { jobseekers } = useSelector((state: RootState) => state.jobseekers);
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const login = JSON.parse(localStorage.getItem("login") || "{}");
  const userInfo = employers.find((elem) => elem.id === login.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataa());
    dispatch(fetchJobs());
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const jobseekerData = {};
    userInfo?.notifications.forEach((elem) => {
      const jobseekerinfo = jobseekers.find(
        (item) => item.email === elem.jobSeekerEmail
      );
      jobseekerData[elem.jobId] = jobseekerinfo;
    });
    setJobseekerInfo(jobseekerData);
  }, [userInfo, jobseekers]);

  const handleOpen = (jobId) => {
    setOpen(true);
    setSelectedJobId(jobId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJobId(null);
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
          {userInfo?.notifications.map((elem) => {
            const jobInfo = jobs.find((job) => job.id === elem.jobId);
            if (!jobInfo) return null;
            return (
              <div
                className="jobs"
                key={elem.jobId}
                onClick={() => handleOpen(elem.jobId)}
              >
                <div className="jobscont">
                  <div className="container">
                    <div className="status">
                      <p className="stat">Applied</p>
                    </div>
                    <div className="inf">
                      <p className="type">
                        {elem.jobSeekerEmail} is applied for a job
                      </p>
                      <p className="type">{jobInfo.title}</p>
                    </div>
                  </div>{" "}
                  <div className="buttons">
                    <button>Ask for an interview</button>
                    <button className="x">X</button>
                  </div>
                </div>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default NotificationEmployer;
