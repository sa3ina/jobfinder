//@ts-nocheck
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../../redux/slices/JobsSlice";
type Props = {};

const FindJobSection = (props: Props) => {
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  return (
    <div className="findjob">
      <p className="find">Find your favorite job</p>
      <Grid container className="findgrid" spacing={3}>
        <Grid item lg={4} md={4} sm={12} xs={12} className="leftside">
          <div className="category">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63bd17a58eb5266d2ea2c2cb_personal-banking.svg"
              alt=""
            />
            <p className="name">Accounting</p>
          </div>
          <div className="category">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63bd17b706b21068b6bb636b_handshake.svg"
              alt=""
            />
            <p className="name">Business & consulting</p>
          </div>
          <div className="category">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63b64e7ae70adc4f50f1c442_human-resources.svg"
              alt=""
            />
            <p className="name">Human research</p>
          </div>
          <div className="category">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63b54fa711e7162df4921135_bullhorn.svg"
              alt=""
            />
            <p className="name">Marketing and finance</p>
          </div>
          <div className="category">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63b55018fcbe526b363ee4d5_curve.svg"
              alt=""
            />
            <p className="name">Design & development</p>
          </div>
          <div className="category">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63b64e5ed7fbc03c0f7cc5bd_save-money.svg"
              alt=""
            />
            <p className="name">Finance management</p>
          </div>
          <div className="category">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63b64e70e566986bb31d6044_folder-management.svg"
              alt=""
            />
            <p className="name">Project management</p>
          </div>
          <div className="category">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63b64e81a775aa7c848a7b5e_customer-care.svg"
              alt=""
            />
            <p className="name">Customer services</p>
          </div>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12} className="rightside">
          {jobs.slice(0, 5).map((elem, i) => {
            return (
              <div className="jobs" key={elem.id}>
                <div className="jobscont">
                  <img src={elem.companylogo} alt="" className="jobicon" />
                  <div className="inf">
                    <p className="jobname">{elem.title}</p>
                    <div className="location">
                      <img
                        src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                        alt=""
                      />
                      <p>{elem.location}</p>
                    </div>
                  </div>
                </div>
                <p className="type">{elem.type}</p>
                <Link to={`/${elem?.id}`}>
                  <button>View job</button>
                </Link>
              </div>
            );
          })}
          <Link to="/jobsgrid">
            <button className="browse">Browse all jobs</button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default FindJobSection;
