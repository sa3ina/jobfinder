//@ts-nocheck
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../redux/slices/JobsSlice";
import { Link } from "react-router-dom";

type Props = {};

const Search = (props: Props) => {
  const [search, setSearch] = useState("");
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  const filteredJobs = jobs.filter((job) => {
    const { title, location, companyname, categories, type } = job;
    const word = search.toLowerCase();
    return (
      title.toLowerCase().includes(word) ||
      location.toLowerCase().includes(word) ||
      companyname.toLowerCase().includes(word) ||
      categories.toLowerCase().includes(word) ||
      type.toLowerCase().includes(word)
    );
  });
  return (
    <div className="searchpage">
      <div className="search">
        <p className="results">Search results</p>
        <div className="left">
          <input
            type="text"
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <button className="explore">Search</button>
        </div>
      </div>
      <Grid container spacing={3} className="grid">
        {filteredJobs.map((elem, i) => {
          return (
            <Grid item key={i} lg={4} md={6} sm={12} xs={12}>
              <div className="jobs" key={i}>
                <p className="intern">{elem.type}</p>
                <p className="jobname">{elem.title}</p>
                <div className="payment">
                  <div>
                    <p>{elem.salary}</p>
                  </div>
                  <p className="dot">.</p>
                  <p>{elem.experience}</p>
                </div>
                <div className="jobscontainer">
                  <img src={elem.companylogo} className="jobicon" />
                  <div className="inf">
                    <p className="jobname">{elem.companyname}</p>
                    <div className="location">
                      <img
                        src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                        alt=""
                      />
                      <p>{elem.location}</p>
                    </div>
                  </div>
                </div>
                <Link to={`/${elem?.id}`} className="link width">
                  <button>View job</button>
                </Link>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Search;
