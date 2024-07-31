import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../redux/slices/JobsSlice";

type Props = {};

const Companies = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
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
        {jobs.map((elem, i) => (
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
                <img src={elem.companylogo} alt="" className="jobicon" />
                <div className="inf">
                  <p className="jobname">{elem.companyname}</p>
                  <p className="place">{elem.companylocation}</p>
                </div>
              </div>
              <div className="position">
                <p className="type">Job position</p>
                <div className="browsejob">
                  <Link to={`/${elem?.id}`} className="link">
                    <p>Browse job </p>
                  </Link>
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
