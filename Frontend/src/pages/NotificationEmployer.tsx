//@ts-nocheck
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
import { fetchPhotos } from "../redux/slices/PhotosSlice";

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
  const { photos } = useSelector((state: RootState) => state.photos);
  const login = JSON.parse(localStorage.getItem("login") || "{}");

  const userInfo = employers.find((elem) => elem.id === login.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataa());
    dispatch(fetchJobs());
    dispatch(fetchData());
    dispatch(fetchPhotos());
  }, [dispatch]);

  useEffect(() => {
    const jobseekerData = {};
    userInfo?.notifications.forEach((elem) => {
      const jobseekerinfo = jobseekers.find(
        (item) => item.email === elem.jobSeekerEmail
      );
      jobseekerData[elem.id] = jobseekerinfo;
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
        status: "rejected",
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

  const notifications = userInfo?.notifications
    .slice(0)
    .reverse()
    .filter((elem) => elem.status === "pending");

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
            width: 600,
            bgcolor: "background.paper",
            p: 4,
            fontFamily: "Outfit",
          }}
        >
          {photos.some(
            (photo) => photo.useremail === jobseekerInfo[selectedJobId]?.email
          ) ? (
            photos.map((photo) => {
              if (photo.useremail === jobseekerInfo[selectedJobId]?.email) {
                return (
                  <img
                    key={photo.id}
                    src={`https://jobfinder-4jwl.onrender.com/${photo.profilePicture.path}`}
                    alt=""
                    width="500px"
                    height="620px"
                  />
                );
              }
              return null;
            })
          ) : (
            <p>User doesn't have CV.</p>
          )}
        </Box>
      </Modal>

      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} className="rightside">
          {notifications.length > 0 ? (
            notifications.map((elem: any, i: any) => {
              const jobInfo = jobs.find((job: any) => job.id === elem.jobId);
              if (!jobInfo) return null;
              return (
                <div className="jobs" key={i}>
                  <div className="jobscont">
                    <div className="container">
                      <div className="status">
                        <p className="stat">applied</p>
                      </div>
                      <div className="inf">
                        <p className="type">
                          {elem.jobSeekerEmail} has applied for the job
                        </p>
                        <p className="type">{jobInfo.title}</p>
                      </div>
                    </div>{" "}
                    <div className="buttons">
                      <button onClick={() => handleOpen(elem.id)}>CV</button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAskForInterview(
                            elem.jobId,
                            elem.jobSeekerEmail
                          );
                        }}
                      >
                        Ask for an interview
                      </button>
                      <button
                        className="x"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectJobseeker(
                            elem.jobId,
                            elem.jobSeekerEmail
                          );
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="noNotif">No notifications..</p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default NotificationEmployer;
