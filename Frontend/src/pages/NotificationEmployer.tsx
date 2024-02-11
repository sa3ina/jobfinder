import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataa } from "../redux/slices/EmployerSlice";
import { fetchJobs } from "../redux/slices/JobsSlice";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { fetchData } from "../redux/slices/JobseekerSlice";
import { useState } from "react";
type Props = {};

const NotificationEmployer = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [jobseekerInfo, setJobseekerInfo] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    p: 4,
    fontFamily: "Outfit",
  };
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
    userInfo?.notifications.map((elem) => {
      const jobseekerinfo = jobseekers.find(
        (item) => item.email === elem.jobSeekerEmail
      );
      setJobseekerInfo(jobseekerinfo);
    });
  }, []);
  console.log(jobseekerInfo);
  return (
    <div className="notificationemp">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal">
            <p className="text">First Name:{jobseekerInfo?.firstname}</p>
            <p className="text">Last Name:{jobseekerInfo?.lastname}</p>
            <p className="text">Education:{jobseekerInfo?.education}</p>
            <p className="text">City:{jobseekerInfo?.city}</p>
            <p className="text">
              Open for remote job:{jobseekerInfo?.remote ? "Yes" : "No"}
            </p>
            <p className="text">Experience:{jobseekerInfo?.experience}</p>
            <p className="text">About:{jobseekerInfo?.about}</p>
          </div>
        </Box>
      </Modal>

      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} className="rightside">
          {userInfo?.notifications.map((elem) => {
            const jobInfo = jobs.find((job) => job.id === elem.jobId);
            if (!jobInfo) return null; // Skip if job info is not found
            return (
              <div className="jobs" onClick={handleOpen}>
                <div className="jobscont">
                  <div className="container">
                    <div className="status">
                      <p className="stat">Applied</p>
                    </div>
                    <div className="inf">
                      {/* <p className="jobname">{elem.title}</p> */}
                      <p className="type">
                        {elem.jobSeekerEmail} is applied for a job
                      </p>
                      <p className="type">{jobInfo.title}</p>
                    </div>
                  </div>{" "}
                  <Link to={`/${elem?.id}`}>
                    <button>Ask for a interview</button>
                  </Link>
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
