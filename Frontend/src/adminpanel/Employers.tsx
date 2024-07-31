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
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/slices/JobseekerSlice";
import { fetchDataa } from "../redux/slices/EmployerSlice";
import { fetchJobs } from "../redux/slices/JobsSlice";

type Props = {};

const Employers = (props: Props) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { employers } = useSelector((state: RootState) => state.employers);
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchDataa());
    dispatch(fetchJobs());
  }, [dispatch]);

  const employerCounts = {};
  jobs.forEach((job) => {
    const employerEmail = job.email;

    if (!employerCounts[employerEmail]) {
      employerCounts[employerEmail] = {
        jobs: 0,
        pending: 0,
        hired: 0,
        rejected: 0,
      };
    }

    employerCounts[employerEmail].jobs += 1;
  });
  employers.forEach((employer) => {
    const email = employer.email;

    if (employer.notifications) {
      employer.notifications.forEach((notification) => {
        const status = notification.status;

        if (employerCounts[email]) {
          employerCounts[email][status] += 1;
        }
      });
    }
  });

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <p className="text">Employers</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Jobs Posted</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>Hired</TableCell>
                <TableCell>Rejected</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employers.map((elem, i) => {
                const { email } = elem;
                const counts = employerCounts[email] || {
                  jobs: 0,
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
                    <TableCell>{counts.jobs}</TableCell>
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

export default Employers;
