import React from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar">
      <Link to="/" className="link">
        <img
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de1e5d01f0364cbcba47a7_Jobhunt.svg"
          alt=""
        />
      </Link>
      <div className="navel">
        <button className="link hamburger">
          <MenuIcon />
        </button>
        <Link to="/" className="link home">
          <p>Home</p>
        </Link>
        <div className="pages">
          <button className="link">
            Pages
            <KeyboardArrowDownIcon />
          </button>
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
  );
};

export default Navbar;
