//@ts-nocheck
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import type { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../../redux/slices/JobsSlice";

const CompanySection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✨ Loading vəziyyəti
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          backgroundColor: "black",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red", padding: "40px" }}>
        Failed to load company data 😢
      </p>
    );
  }

  return (
    <div className="companysection">
      <div className="findfav">
        <p className="find">Find your favorite job</p>
        <Link to="companies">
          <button>View all</button>
        </Link>
      </div>

      <Grid
        container
        className="findcompany"
        spacing={2}
        style={{
          transform:
            scrollPosition > 3900
              ? `translateX(${Math.min(
                  400,
                  Math.max(0, scrollPosition - 3900)
                )}px)`
              : "translateX(0)",
        }}
      >
        {jobs.slice(0, 4).map((elem, i) => (
          <Grid
            item
            key={i}
            lg={3}
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
                    <p>Browse job</p>
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

      <Grid
        container
        className="findcompany2"
        spacing={2}
        style={{
          transform:
            scrollPosition > 3900
              ? `translateX(${-Math.min(
                  400,
                  Math.max(0, scrollPosition - 3900)
                )}px)`
              : "translateX(0)",
        }}
      >
        {jobs.slice(4, 8).map((elem, i) => (
          <Grid
            item
            key={i}
            lg={3}
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
                    <p>Browse job</p>
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

export default CompanySection;
