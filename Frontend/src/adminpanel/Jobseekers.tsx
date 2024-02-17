import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/slices/JobseekerSlice";
import { fetchDataa } from "../redux/slices/EmployerSlice";

type Props = {};

const Jobseekers = (props: Props) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { jobseekers, loading, error } = useSelector(
    (state: RootState) => state.jobseekers
  );
  const { employers } = useSelector((state: RootState) => state.employers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchDataa());
  }, [dispatch]);
  const jobSeekerCounts = {};

  employers.forEach((employer) => {
    employer.notifications.forEach((notification) => {
      const jobSeekerEmail = notification.jobSeekerEmail;
      const status = notification.status;
      if (!jobSeekerCounts[jobSeekerEmail]) {
        jobSeekerCounts[jobSeekerEmail] = { pending: 0, hired: 0, rejected: 0 };
      }
      jobSeekerCounts[jobSeekerEmail][status] += 1;
    });
  });
  const totalApplications = jobseekers.reduce((total, elem) => {
    const counts = jobSeekerCounts[elem.email] || {
      pending: 0,
      hired: 0,
      rejected: 0,
    };
    return total + counts.pending + counts.hired + counts.rejected;
  }, 0);
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <p className="text">Jobseekers</p>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>Hired</TableCell>
                <TableCell>Rejected</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobseekers.map((elem, i) => {
                const { email } = elem;
                const counts = jobSeekerCounts[email] || {
                  pending: 0,
                  hired: 0,
                  rejected: 0,
                };
                const total = counts.pending + counts.hired + counts.rejected;
                return (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{elem.id}</TableCell>
                    <TableCell>{elem.email}</TableCell>
                    <TableCell>{elem.city}</TableCell>
                    <TableCell>{counts.pending}</TableCell>
                    <TableCell>{counts.hired}</TableCell>
                    <TableCell>{counts.rejected}</TableCell>
                    <TableCell>{total}</TableCell>
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

export default Jobseekers;
