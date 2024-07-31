import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { Formik, Form, Field } from "formik";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataa } from "../../src/redux/slices/EmployerSlice";
import { deleteJob, fetchJobs } from "../../src/redux/slices/JobsSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { fetchData } from "../redux/slices/JobseekerSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import {
  hireJobseeker,
  rejectJobseeker,
  askForInterview,
} from "../../src/redux/slices/EmployerSlice";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { fetchPhotos } from "../redux/slices/PhotosSlice";
import { editJob } from "../../src/redux/slices/JobsSlice";
import { Button } from "@mui/material";
import type { AppDispatch } from "../redux/store";

type Props = {};

const ProfileEmployer = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobseekerInfo, setJobseekerInfo] = useState({});
  const [jobInfo, setJobInfo] = useState({});
  const [editModal, setEditModal] = useState(false);
  const { employers, loading, error } = useSelector(
    (state: RootState) => state.employers
  );
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const { photos } = useSelector((state: RootState) => state.photos);
  const { jobseekers } = useSelector((state: RootState) => state.jobseekers);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDataa());
    dispatch(fetchJobs());
    dispatch(fetchData());
    dispatch(fetchPhotos());
  }, [dispatch]);

  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem("login") || "{}");
  const id = login.id;
  const userInfo = employers.find((elem) => elem.id === id);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("login");
    navigate("/");
    window.location.reload();
  };

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    userInfo?.notifications.forEach((elem) => {
      const jobseekerinfo = jobseekers.find(
        (item) => item.email === elem.jobSeekerEmail
      );
      const jobinfo = jobs.find((item) => item.id === elem.jobId);

      setJobseekerInfo((prev) => ({
        ...prev,
        [elem.jobId]: jobseekerinfo,
      }));
      setJobInfo((prev) => ({
        ...prev,
        [elem.jobId]: jobinfo,
      }));
    });
  }, [userInfo, jobseekers, jobs]);
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
  const handleEditOpen = (jobId) => {
    setEditModal(true);
    setSelectedJobId(jobId);
    if (!jobInfo[jobId]) {
      const job = jobs.find((job) => job.id === jobId);
      setJobInfo((prevJobInfo) => ({
        ...prevJobInfo,
        [jobId]: job,
      }));
    }
  };

  const handleEditClose = () => {
    setEditModal(false);
    setSelectedJobId(null);
  };
  const handleEdit = async (values) => {
    try {
      const selectedJob = jobInfo[selectedJobId];
      await dispatch(editJob({ ...selectedJob, ...values }));
    } catch (error) {}
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    "@media (min-width: 501px)": {
      width: "70%",
    },
    "@media (min-width: 769px)": {
      width: "50%",
    },
    "@media (max-width: 470px)": {
      width: "90%",
    },
  };
  return (
    <>
      <div className="profilemployer">
        <Grid container className="findgrid" spacing={3}>
          <Grid item lg={3} md={12} sm={12} xs={12} className="leftside">
            <div className="form">
              <img
                src="https://jatinvats.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F4d8cf7af-147c-416e-8774-38f1883323e5%2F3314844f-cde3-4186-876a-9e8db7c29791%2Fdp.png?table=block&id=dce6ac6e-0c14-4140-8352-c32c0262937d&spaceId=4d8cf7af-147c-416e-8774-38f1883323e5&width=250&userId=&cache=v2"
                alt=""
              />
              <div className="userinfo">
                <div className="namesurname">
                  <p className="text">{userInfo?.firstname}</p>
                  <p className="text">{userInfo?.lastname}</p>
                </div>
                <p className="text">{userInfo?.email}</p>
                <button onClick={handleLogout} className="logout">
                  logout
                </button>
              </div>
            </div>
          </Grid>
          <Grid item lg={9} md={12} sm={12} xs={12} className="rightside">
            <Modal
              open={editModal}
              onClose={handleEditClose}
              aria-labelledby="edit-job-modal-title"
              aria-describedby="edit-job-modal-description"
            >
              <Box sx={style}>
                <h2
                  id="edit-job-modal-title"
                  style={{ marginBottom: "10px", textAlign: "center" }}
                >
                  Edit Job
                </h2>
                <Formik
                  initialValues={{
                    title: jobInfo[selectedJobId]?.title,
                    categories: jobInfo[selectedJobId]?.categories,
                    salary: jobInfo[selectedJobId]?.salary,
                    location: jobInfo[selectedJobId]?.location,
                    type: jobInfo[selectedJobId]?.type,
                    remote: jobInfo[selectedJobId]?.remote,
                    experience: jobInfo[selectedJobId]?.experience,
                  }}
                  onSubmit={(values) => {
                    handleEdit(values);
                    handleEditClose();
                    enqueueSnackbar("Job edited successfully!", {
                      variant: "success",
                    });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="form" style={{ fontFamily: "Work Sans" }}>
                      <label htmlFor="title">Title:</label>
                      <Field
                        type="text"
                        name="title"
                        style={{ padding: "1px" }}
                      />
                      <label htmlFor="categories">Categories:</label>
                      <Field
                        type="text"
                        name="categories"
                        style={{ padding: "1px" }}
                      />
                      <label htmlFor="salary">Salary:</label>
                      <Field
                        type="text"
                        name="salary"
                        style={{ padding: "1px" }}
                      />
                      <label htmlFor="location">Location:</label>
                      <Field
                        type="text"
                        name="location"
                        style={{ padding: "1px" }}
                      />
                      <label htmlFor="type">Type:</label>
                      <Field
                        type="text"
                        name="type"
                        style={{ padding: "1px" }}
                      />
                      <label htmlFor="type">Remote:</label>
                      <Field
                        type="text"
                        name="remote"
                        style={{ padding: "1px" }}
                      />
                      <label htmlFor="type">Experience:</label>
                      <Field
                        type="text"
                        name="experience"
                        style={{ padding: "1px" }}
                      />
                      <Button
                        style={{ backgroundColor: "#95B8D1 ", color: "white" }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Modal>
            <p className="posted">Jobs that you posted</p>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>View job</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((elem, i) => {
                    if (elem.email == userInfo?.email) {
                      return (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{elem.title}</TableCell>
                          <TableCell>{elem.categories}</TableCell>
                          <TableCell>{elem.salary}</TableCell>

                          <TableCell>
                            <button
                              className="view"
                              onClick={() => {
                                navigate(`/${elem.id}`);
                              }}
                            >
                              View
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              className="edit"
                              onClick={() => handleEditOpen(elem?.id)}
                            >
                              Edit
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              className="deletejob"
                              onClick={() => {
                                dispatch(deleteJob(elem.id));
                                enqueueSnackbar("Job deleted successfully!", {
                                  variant: "success",
                                });
                              }}
                            >
                              delete
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <p className="candidates">Candidates</p>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>About</TableCell>
                    <TableCell>Job Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userInfo?.notifications
                    .slice(0)
                    .reverse()
                    .map((elem, i) => {
                      return (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            {elem.jobSeekerEmail}
                            {/* {jobseekerInfo[elem.jobId]?.firstname}{" "}
                          {jobseekerInfo[elem.jobId]?.lastname} */}
                          </TableCell>
                          <TableCell>
                            <button
                              className="details"
                              onClick={() => handleOpen(elem?.id)}
                            >
                              View Details
                            </button>
                          </TableCell>
                          <TableCell>{jobInfo[elem.jobId]?.title}</TableCell>
                          <TableCell>{elem.status}</TableCell>
                          <TableCell>
                            <button
                              className="let"
                              onClick={() => {
                                dispatch(
                                  hireJobseeker({
                                    employerEmail: userInfo.email,
                                    jobId: elem.jobId,
                                    jobSeekerEmail: elem.jobSeekerEmail,
                                    status: "hired",
                                  })
                                );
                                enqueueSnackbar("Jobseeker is hired!", {
                                  variant: "success",
                                });
                              }}
                            >
                              <CheckIcon />
                            </button>
                            <button
                              className="interview"
                              onClick={() => {
                                dispatch(
                                  askForInterview({
                                    employerEmail: userInfo.email,
                                    jobId: elem.jobId,
                                    jobSeekerEmail: elem.jobSeekerEmail,
                                    status: "interview",
                                  })
                                );
                                enqueueSnackbar(
                                  "Job seeker is asked for interview!",
                                  {
                                    variant: "success",
                                  }
                                );
                              }}
                            >
                              <ConnectWithoutContactIcon />
                            </button>
                            <button
                              className="delete"
                              onClick={() => {
                                dispatch(
                                  rejectJobseeker({
                                    employerEmail: userInfo.email,
                                    jobId: elem.jobId,
                                    jobSeekerEmail: elem.jobSeekerEmail,
                                    status: "rejected",
                                  })
                                );
                                enqueueSnackbar("Job seeker is rejected.", {
                                  variant: "success",
                                });
                              }}
                            >
                              <CloseIcon />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
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
    </>
  );
};

export default ProfileEmployer;
