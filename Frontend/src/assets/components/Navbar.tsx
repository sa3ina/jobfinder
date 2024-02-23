import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { fetchDataa } from "../../redux/slices/EmployerSlice";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
type Props = {};

const Navbar = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { employers, loading, error } = useSelector(
    (state: RootState) => state.employers
  );
  const { jobseekers } = useSelector((state: RootState) => state.jobseekers);
  const login = JSON.parse(localStorage.getItem("login") || "{}");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataa());
  }, [dispatch]);
  const userInfo = employers.find((elem) => elem.id === login.id);
  const userInfo2 = jobseekers.find((elem) => elem.id === login.id);
  const [isPagesHovered, setIsPagesHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldLog, setShouldLog] = useState(false);
  const [isJobseeker, setIsJobseeker] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);

  const handlePagesClick = () => {
    setIsPagesHovered(!isPagesHovered);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  const handleOpenMenu = () => {
    console.log("Opening menu...");
    setIsMenuOpen(true);
    setShouldLog(true);
  };
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "jobseeker") {
      setIsJobseeker(true);
    } else if (userRole === "employer") {
      setIsEmployer(true);
    }
  }, []);
  const pendingNotificationsCount = userInfo?.notifications.filter(
    (elem) => elem.status === "pending"
  ).length;
  const pendingNotificationsCount2 = employers.reduce((acc, employer) => {
    return (
      acc +
      employer?.notifications?.filter(
        (notification) =>
          notification?.jobSeekerEmail === userInfo2?.email &&
          notification?.status != "pending"
      ).length
    );
  }, 0);

  return (
    <>
      <div className="navbar">
        <Link to="/" className="link">
          <img
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de1e5d01f0364cbcba47a7_Jobhunt.svg"
            alt=""
          />
        </Link>
        <div className="navel">
          <button
            className="link hamburger"
            onClick={() => handleOpenMenu()}
            onMouseDown={() => console.log("Button clicked!")}
          >
            <MenuIcon />
          </button>
          <Link to="/" className="link home">
            <p>Home</p>
          </Link>
          <div className="pages" onClick={handlePagesClick}>
            <Button
              className="link"
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                color: "white",
                fontFamily: "Work Sans",
                fontSize: "17px",
                fontWeight: "400",
              }}
            >
              Pages
              <KeyboardArrowDownIcon />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              PaperProps={{
                style: {
                  width: 350,
                  backgroundColor: "#1e1e1e",
                  border: "2px solid rgb(47, 46, 46)",
                  borderRadius: 4,
                  color: "white",
                  zIndex: 20,
                  display: open ? "" : "none",
                  alignItems: "center",
                  marginTop: "10px",
                  padding: 5,
                  textAlign: "left",
                  fontFamily: "Work Sans",
                  boxShadow: "none",
                  elevation: 0,
                  "&:hover": {
                    boxShadow: "none",
                    elevation: 0,
                  },
                  "&:active": {
                    boxShadow: "none",
                    elevation: 0,
                  },
                },
              }}
            >
              <Grid container className="pagescont">
                <Grid item lg={6} md={6} sm={6} xs={12} className="sect">
                  <p className="strong">Pages</p>{" "}
                  <Link to="/" className="link">
                    <p className="normal">Home</p>
                  </Link>
                  <Link to="/jobsgrid" className="link">
                    <p className="normal">Find job</p>
                  </Link>
                  <Link to="/postjob" className="link">
                    <p className="normal">Post job</p>
                  </Link>
                  <Link to="/jobsgrid" className="link">
                    <p className="normal">Jobs Grid</p>
                  </Link>
                  <Link to="/jobslist" className="link">
                    <p className="normal"> Jobs list</p>
                  </Link>
                  <Link to="/companies" className="link">
                    <p className="normal">Companies</p>
                  </Link>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} className="sect">
                  <p className="strong">User Pages</p>
                  <p className="normal">Licenses</p>
                  <p className="normal">Instructions</p>
                  <p className="normal">Changelog</p>
                  <Link to="/login" className="link">
                    <p className="normal">Log in</p>
                  </Link>
                  <Link to="/signup" className="link">
                    <p className="normal">Sign Up</p>
                  </Link>
                </Grid>
              </Grid>
            </Menu>
          </div>
          <Link
            to={isEmployer ? "/postjob" : "/jobsgrid"}
            className="link findjob"
          >
            <p>{isEmployer ? "Post a Job" : "Find a Job"}</p>
          </Link>
          {isEmployer || isJobseeker ? (
            <Link
              className="link"
              to={isEmployer ? "/notificationemp" : "/notificationjs"}
            >
              <button className="link cart" style={{ position: "relative" }}>
                <CircleNotificationsIcon style={{ fontSize: "40px" }} />{" "}
                <p
                  style={{
                    position: "absolute",
                    backgroundColor: "#C1111F",
                    right: "-4px",
                    top: "0px",
                  }}
                >
                  {isEmployer
                    ? pendingNotificationsCount
                    : pendingNotificationsCount2}
                </p>
              </button>
            </Link>
          ) : (
            ""
          )}

          <Link
            to={
              isJobseeker
                ? "/profilejobseeker"
                : isEmployer
                ? "/profilemployer"
                : "/login"
            }
            className="link postjob"
          >
            <p>{isJobseeker || isEmployer ? "My Profile" : "Log In"}</p>
          </Link>
        </div>
      </div>
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            top: "100px",
            position: "absolute",
            marginTop: isMenuOpen ? "0" : "100px",
            transition: "margin-top 225ms cubic-bezier(0, 0, 0.2, 1)",
          },
        }}
        BackdropProps={{
          invisible: true,
        }}
      >
        <div className="drawer">
          <Link to="/" className="link">
            <p>Home</p>
          </Link>

          <Link to="/findjob" className="link">
            <p>Find job</p>
          </Link>
          <Link to="/postjob" className="link">
            <p>Post job</p>
          </Link>
          <Link to="/jobsgrid" className="link">
            <p>Jobs Grid</p>
          </Link>
          <Link to="/jobslist" className="link">
            <p>Jobs list</p>
          </Link>
          <Link to="/companies" className="link">
            <p>Companies</p>
          </Link>
          <Link to="/login" className="link">
            <p>Log in</p>
          </Link>
          <Link to="/signup" className="link">
            <p>Sign Up</p>
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
