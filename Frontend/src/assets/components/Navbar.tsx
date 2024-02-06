import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

type Props = {};

const Navbar = (props: Props) => {
  const [isPagesHovered, setIsPagesHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldLog, setShouldLog] = useState(false);

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
            <button className="link">
              Pages
              <KeyboardArrowDownIcon />
            </button>
            <div className={`pageshover ${isPagesHovered ? "show" : ""}`}>
              <Grid container className="pagescont">
                <Grid item lg={6} md={6} sm={6} xs={12} className="sect">
                  <p className="strong">Pages</p>{" "}
                  <Link to="/" className="link">
                    <p className="normal">Home</p>
                  </Link>
                  <Link to="/findjob" className="link">
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
                    <p className="normal">Login</p>
                  </Link>
                  <Link to="/signup" className="link">
                    <p className="normal">Sign Up</p>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
          <Link to="/findjob" className="link findjob">
            <p>Find a Job</p>
          </Link>
          <button className="link cart">
            Cart <p>0</p>
          </button>
          <Link to="/postjob" className="link postjob">
            <p>Post a Job</p>
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
            <p>Login</p>
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
