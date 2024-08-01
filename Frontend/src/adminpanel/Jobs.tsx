//@ts-nocheck
import { useState, useEffect } from "react";
import "./admin.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { Formik, Form, Field } from "formik";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../redux/slices/JobsSlice";
import { deleteJob } from "../redux/slices/JobsSlice";
import { editJob } from "../redux/slices/JobsSlice";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

import { Box } from "@mui/material";

type Props = {};

const Jobs = (props: Props) => {
  const [editModal, setEditModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobInfo, setJobInfo] = useState({});
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
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
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <p className="text">Jobs</p>
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
                companylogo: jobInfo[selectedJobId]?.companylogo,
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
                  <Field type="text" name="title" style={{ padding: "1px" }} />
                  <label htmlFor="categories">Categories:</label>
                  <Field
                    type="text"
                    name="categories"
                    style={{ padding: "1px" }}
                  />
                  <label htmlFor="salary">Salary:</label>
                  <Field type="text" name="salary" style={{ padding: "1px" }} />
                  <label htmlFor="location">Location:</label>
                  <Field
                    type="text"
                    name="location"
                    style={{ padding: "1px" }}
                  />
                  <label htmlFor="type">Type:</label>
                  <Field type="text" name="type" style={{ padding: "1px" }} />
                  <label htmlFor="type">Remote:</label>
                  <Field type="text" name="remote" style={{ padding: "1px" }} />
                  <label htmlFor="type">Experience:</label>
                  <Field
                    type="text"
                    name="experience"
                    style={{ padding: "1px" }}
                  />
                  {/* <label htmlFor="type">CompanyLogo:</label>

                  <Field
                    type="text"
                    name="companylogo"
                    style={{ padding: "1px" }}
                  /> */}
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>

                <TableCell>Company Name</TableCell>
                <TableCell>Company Email</TableCell>
                <TableCell>Employer Email</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((elem, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{elem.id}</TableCell>

                    <TableCell>{elem.title}</TableCell>
                    <TableCell>{elem.categories}</TableCell>
                    {/* <TableCell>
                      <img src={`${elem.companylogo}`} alt="" width="50" />
                    </TableCell> */}
                    <TableCell>{elem.companyname}</TableCell>
                    <TableCell>{elem.companyemail}</TableCell>
                    <TableCell>{elem.email}</TableCell>
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
                    {/* <TableCell>
                      <button
                        className="edit"
                        onClick={() => handleEditOpen(elem?.id)}
                      >
                        Edit
                      </button>
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Jobs;
