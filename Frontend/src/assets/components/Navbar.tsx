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
                  <p className="strong">Pages</p>
                  <p className="normal">Home</p>
                  <p className="normal">About Us</p>
                  <p className="normal">Jobs</p>
                  <p className="normal">Blog</p>
                  <p className="normal">Companies</p>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} className="sect">
                  <p className="strong">Style Guide</p>
                  <p className="normal">Licenses</p>
                  <p className="normal">Instructions</p>
                  <p className="normal">Changelog</p>
                  <p className="normal">404 Not Found</p>
                  <p className="normal">Protected Password</p>
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
      <Drawer anchor="top" open={isMenuOpen} onClose={handleCloseMenu}>
        <div>
          <p>Pages</p>
        </div>
        <div>
          <p>Find a job</p>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
