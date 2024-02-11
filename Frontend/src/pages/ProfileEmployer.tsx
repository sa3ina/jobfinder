import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
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
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { fetchData } from "../redux/slices/JobseekerSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
type Props = {};

const ProfileEmployer = (props: Props) => {
  const [jobseekerInfo, setJobseekerInfo] = useState({});
  const [jobInfo, setJobInfo] = useState({});

  const { employers, loading, error } = useSelector(
    (state: RootState) => state.employers
  );
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const { jobseekers } = useSelector((state: RootState) => state.jobseekers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataa());
    dispatch(fetchJobs());
    dispatch(fetchData());
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

  return (
    <>
      <div className="profilemployer">
        <Grid container className="findgrid" spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12} className="leftside">
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
          <Grid item lg={9} md={9} sm={12} xs={12} className="rightside">
            <p className="posted">Jobs that you posted</p>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
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
                    <TableCell>Name</TableCell>
                    <TableCell>Job Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userInfo?.notifications.map((elem, i) => {
                    return (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          {jobseekerInfo[elem.jobId]?.firstname}{" "}
                          {jobseekerInfo[elem.jobId]?.lastname}
                        </TableCell>
                        <TableCell>{jobInfo[elem.jobId]?.title}</TableCell>
                        <TableCell>{elem.status}</TableCell>
                        <TableCell>
                          <button
                            className="let"
                            onClick={() => {
                              dispatch(deleteJob(elem.id));
                              enqueueSnackbar("Job deleted successfully!", {
                                variant: "success",
                              });
                            }}
                          >
                            <CheckIcon />
                          </button>
                          <button
                            className="delete"
                            onClick={() => {
                              dispatch(deleteJob(elem.id));
                              enqueueSnackbar("Job deleted successfully!", {
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
    </>
  );
};

export default ProfileEmployer;
