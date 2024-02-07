import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

type Props = {};

const JobsGrid = (props: Props) => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="jobspage">
      <div className="jobsgrid">
        <p className="find">Jobs Grid</p>
        <p className="yet">
          Yet uncommonly his ten who diminution astonished. Demesne new manners
          savings staying had.
        </p>
      </div>
      <Grid container className="findgrid" spacing={3}>
        <Grid item lg={3} md={3} sm={12} xs={12} className="leftside">
          <div className="cont">
            <p className="categ">Categories</p>
            <div className="category">
              <p className="name">Accounting</p>
            </div>
            <div className="category">
              <p className="name">Business & consulting</p>
            </div>
            <div className="category">
              <p className="name">Human research</p>
            </div>
            <div className="category">
              <p className="name">Marketing and finance</p>
            </div>
            <div className="category">
              <p className="name">Design & development</p>
            </div>
            <div className="category">
              <p className="name">Finance management</p>
            </div>
            <div className="category">
              <p className="name">Project management</p>
            </div>
            <div className="category">
              <p className="name">Customer services</p>
            </div>
          </div>
          <div className="cont">
            {" "}
            <p className="categ">Job level categories</p>
            <div className="category">
              <p className="name">Senior</p>
            </div>
            <div className="category">
              <p className="name">Executive</p>
            </div>
            <div className="category">
              <p className="name">Junior</p>
            </div>
          </div>
          <div>
            <p className="categ">Company</p>
            <div className="category">
              <p className="name">Amazon</p>
            </div>
            <div className="category">
              <p className="name">Microsoft</p>
            </div>
            <div className="category">
              <p className="name">Apple</p>
            </div>
            <div className="category">
              <p className="name">Netflix</p>
            </div>
            <div className="category">
              <p className="name">Google</p>
            </div>
            <div className="category">
              <p className="name">Disney</p>
            </div>
            <div className="category">
              <p className="name">Tesla</p>
            </div>
          </div>
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12} className="rightside">
          <Grid container spacing={3}>
            {arr.map((elem, i) => {
              return (
                <Grid item key={i} lg={6} md={6} sm={6} xs={12}>
                  <div className="jobs" key={i}>
                    <p className="intern">Internship</p>
                    <p className="jobname">Digital Marketing Manager</p>
                    <div className="payment">
                      <div>
                        <p>$8.000</p>
                        <p>USD</p>
                      </div>
                      <p className="dot">.</p>
                      <p>Junior</p>
                    </div>
                    <div className="jobscontainer">
                      <img
                        src="https://assets-global.website-files.com/63b3bf674632664abc613903/63c7e4e481ac42dbc0f41e79_company-02.png"
                        alt=""
                        className="jobicon"
                      />
                      <div className="inf">
                        <p className="jobname">Amazon</p>
                        <div className="location">
                          <img
                            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                            alt=""
                          />
                          <p>Remote</p>
                        </div>
                      </div>
                    </div>
                    <Link to="/1" className="link width">
                      <button>View job</button>
                    </Link>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <div className="select">
        <p className="location">Select by Location</p>

        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <div className="locationcont">
              <div className="image image1">
                <p>Remote</p>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <div className="locationcont">
              <div className="image image2">
                <p>Tokyo, Japan</p>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <div className="locationcont">
              <div className="image image3">
                <p>London, UK</p>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <div className="locationcont">
              <div className="image image4">
                <p>Mumbai, India</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default JobsGrid;
