//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../src/redux/slices/JobseekerSlice";
import { fetchJobs } from "../../src/redux/slices/JobsSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import axios from "axios";

import DescriptionIcon from "@mui/icons-material/Description";
import { fetchPhotos } from "../redux/slices/PhotosSlice";
import { useSnackbar } from "notistack";

type Props = {};

const ProfileJobSeeker = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const { jobseekers, loading, error } = useSelector(
    (state: RootState) => state.jobseekers
  );
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const { employers } = useSelector((state: RootState) => state.employers);
  const dispatch = useDispatch();
  const { photos } = useSelector((state: RootState) => state.photos);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchJobs());
    dispatch(fetchPhotos());
  }, [dispatch, photos]);
  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem("login") || "{}");
  const authToken = localStorage.getItem("authToken");
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
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("useremail", login.email);
    formData.append("imageFile", imageFile);

    try {
      const response = await axios.post(
        "https://jobfinder-4jwl.onrender.com/photos",
        formData
      );
      // console.log("Response:", response.data);
      if (response.data) {
        // console.log("File uploaded:", response.data.path);
        enqueueSnackbar("File uploaded!", {
          variant: "success",
        });
      } else {
        // console.error("Unexpected response format");
        enqueueSnackbar("File format is not correct!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("File format is not correct!", {
        variant: "error",
      });
      console.error("Error uploading file:", error.message);
    }
  };
  const [cv, setCv] = useState(false);
  useEffect(() => {
    const hasCv = photos.some((elem) => elem.useremail === login.email);

    if (hasCv !== cv) {
      setCv(hasCv);
    }
  }, [cv, login.email, photos]);

  return (
    <>
      <div className="profilemployer">
        <Grid container className="findgrid" spacing={3}>
          <Grid item lg={4} md={4} sm={12} xs={12} className="leftside">
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
                <div className="cvfile">
                  {cv ? (
                    ""
                  ) : (
                    <div className="cv">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <button onClick={handleSubmit}>
                        <DescriptionIcon />
                      </button>
                    </div>
                  )}
                </div>

                <button onClick={handleLogout} className="logout">
                  logout
                </button>
              </div>
            </div>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12} className="rightside">
            <p className="posted">Jobs that you applied</p>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Employer</TableCell>
                    <TableCell>View job</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employers.map((employer) =>
                    employer.notifications.map((notification) => {
                      if (notification.jobSeekerEmail === userInfo?.email) {
                        const job = jobs.find(
                          (job) => job.id === notification.jobId
                        );
                        if (job) {
                          return (
                            <TableRow key={job.id}>
                              <TableCell>{job.title}</TableCell>
                              <TableCell>{job.categories}</TableCell>
                              <TableCell>{notification.status}</TableCell>
                              <TableCell>
                                {employer.firstname} {employer.lastname}
                              </TableCell>
                              <TableCell>
                                <button
                                  className="view"
                                  onClick={() => {
                                    navigate(`/${job.id}`);
                                  }}
                                >
                                  View
                                </button>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }
                      return null;
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProfileJobSeeker;
