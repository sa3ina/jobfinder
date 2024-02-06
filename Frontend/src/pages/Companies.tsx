import React from "react";
import Grid from "@mui/material/Grid";

type Props = {};

const Companies = (props: Props) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="companypage">
      <div className="compheading">
        <p className="comp">Companies</p>
        <p className="yet">
          Yet uncommonly his ten who diminution astonished. Demesne new manners
          savings staying had.
        </p>
      </div>
      <Grid container className="findcompany" spacing={2}>
        {arr.map((elem, i) => (
          <Grid
            item
            key={i}
            lg={4}
            md={6}
            sm={12}
            xs={12}
            className="rightside"
          >
            <div className="jobs">
              <div className="jobscont">
                <img
                  src="https://assets-global.website-files.com/63b3bf674632664abc613903/63c7e54d22d142869c20f953_vk.svg"
                  alt=""
                  className="jobicon"
                />
                <div className="inf">
                  <p className="jobname">beWellfed</p>
                  <p className="place">Tokyo, Japan</p>
                </div>
              </div>
              <div className="position">
                <p className="type">5 Positions</p>
                <div className="browsejob">
                  <p>Browse job </p>
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63ddf30d1693d1f9dae4820f_arrow-right-royal-blue.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Companies;
