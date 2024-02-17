import React from "react";
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
import type { RootState } from "../redux/store";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../redux/slices/JobsSlice";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { deleteJob } from "../redux/slices/JobsSlice";
type Props = {};

const Jobs = (props: Props) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <p className="text">Jobs</p>
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
