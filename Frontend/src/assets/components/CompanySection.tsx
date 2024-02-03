import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

const CompanySection = () => {
  const arr = [1, 2, 3, 4];
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollPosition(scrollPosition);
    };
    console.log(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="companysection">
      <div className="findfav">
        <p className="find">Find your favorite job</p>
        <button>View all</button>
      </div>
      <Grid
        container
        className="findcompany"
        spacing={2}
        style={{
          transform:
            scrollPosition > 3900
              ? `translateX(${Math.min(
                  200,
                  Math.max(0, scrollPosition - 3900)
                )}px)`
              : "translateX(0)",
        }}
      >
        {arr.map((elem, i) => (
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
      <Grid
        container
        className="findcompany2"
        spacing={2}
        style={{
          transform:
            scrollPosition > 3900
              ? `translateX(${-Math.min(
                  200,
                  Math.max(0, scrollPosition - 3900)
                )}px)`
              : "translateX(0)",
        }}
      >
        {arr.map((elem, i) => (
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
                <img
                  src="https://assets-global.website-files.com/63b3bf674632664abc613903/63c7e0bd624809323e2e78ad_teams.svg"
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

export default CompanySection;
