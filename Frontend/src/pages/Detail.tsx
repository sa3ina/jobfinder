import Grid from "@mui/material/Grid";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {};

const Detail = (props: Props) => {
  const arr = [1, 2, 3, 4, 5];
  const rightSideRef = useRef(null);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const rightSide = rightSideRef.current;
  //       const containerRect = rightSide.parentElement.getBoundingClientRect();
  //       const rightSideRect = rightSide.getBoundingClientRect();

  //       const containerTop = containerRect.top + window.scrollY;
  //       const containerBottom = containerRect.bottom + window.scrollY;
  //       const rightSideBottom = rightSideRect.bottom + window.scrollY;

  //       if (
  //         window.scrollY > containerTop &&
  //         window.scrollY < containerBottom - rightSideRect.height
  //       ) {
  //         if (rightSideBottom > containerBottom) {
  //           rightSide.style.position = "fixed";
  //           rightSide.style.top = `${containerBottom - rightSideRect.height}px`;
  //           rightSide.style.bottom = "";
  //         } else {
  //           rightSide.style.position = "fixed";
  //           rightSide.style.top = "";
  //           rightSide.style.bottom = "0";
  //         }
  //       } else {
  //         rightSide.style.position = "static";
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  return (
    <div className="detail">
      <div className="image"></div>
      <div className="detailpage">
        <div className="jobsinfo">
          <div className="imagediv">
            <img
              src="https://assets-global.website-files.com/63b3bf674632664abc613903/63c7e048dbd85384ac3e7adf_skype.svg"
              alt=""
            />
          </div>
          <div className="detailjob">
            <p className="jobnamedetail">Digital Marketing Manager</p>
            <p className="companyname">Webflow</p>
          </div>
        </div>
        <Grid container className="detailgrid" spacing={5}>
          <Grid item lg={7} md={7} sm={12} xs={12} className="leftside">
            <div className="jobdesc">
              <p className="heading">Job Description</p>
              <p className="text">
                Two before narrow not relied how except moment myself Dejection
                assurance mrs led certainly So gate at no only none open
                Betrayed at properly it of graceful on Dinner abroad am depart
                ye turned hearts as me wished Therefore allowance too perfectly
                gentleman supposing man his now Families goodness all eat out
                bed steepest servants Explained the incommode sir improving
                northward immediate eat Man denoting received you possible you
                Shew park own loud son door less yet.How promotion excellent
                curiosity yet attempted happiness Gay prosperous impression had
                conviction For every delay death ask style Me mean able my by in
                they Extremity now strangers contained breakfast him discourse
                additions Sincerity collected contented led now perpetual
                extremely forfeited
              </p>
              <p className="heading">Key Responsibilities</p>
              {arr.map((elem) => {
                return (
                  <p className="textwithbullet">
                    Of resolve to gravity thought my prepare chamber so
                    Unsatiable entreaties collecting may sympathize nay
                    interested instrument If continue building numerous of at
                    relation in margaret Lasted engage roused.
                  </p>
                );
              })}
              <p className="heading">Benefits</p>
              <p className="text">
                {arr.map((elem) => {
                  return (
                    <p className="textwithbullet">
                      Post no so what deal evil rent by real in.
                    </p>
                  );
                })}
              </p>
            </div>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12} className="rightside">
            <div className="jobinfo" ref={rightSideRef}>
              <p className="overview">Overview</p>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d35090828f95aacc7487_calendar.svg"
                    alt=""
                  />
                  <p className="question">Posted on:</p>
                </div>
                <p className="answer">January 18, 2023</p>
              </div>

              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                    alt=""
                  />
                  <p className="question">Location:</p>
                </div>
                <p className="answer">Tokyo, Japan</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d5981d90ae2c2100db4b_bar-chart-line.svg"
                    alt=""
                  />
                  <p className="question">Level:</p>
                </div>
                <p className="answer">Junior</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d5ceca7c08854cbd4666_briefcase.svg"
                    alt=""
                  />
                  <p className="question">Department:</p>
                </div>
                <p className="answer">Accounting</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d652823a1efb2120b66a_clock.svg"
                    alt=""
                  />
                  <p className="question">Time:</p>
                </div>
                <p className="answer">Internship</p>
              </div>
              <div className="list">
                <div className="info">
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b7d610fd7a42d3fffb2221_cash-coin.svg"
                    alt=""
                  />
                  <p className="question">Salary:</p>
                </div>
                <p className="answer">$8,000 USD</p>
              </div>
              <button>Apply now</button>
            </div>
          </Grid>
        </Grid>{" "}
        <div className="similarjob">
          <p className="similar">Similar job openings</p>
          <div className="viewall">
            <Link to="/jobsgrid" className="link">
              <button className="view">View all jobs</button>
            </Link>

            <img
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63ddf30d1693d1f9dae4820f_arrow-right-royal-blue.svg"
              alt=""
            />
          </div>
        </div>
        <Grid container spacing={3}>
          {arr.map((elem, i) => {
            return (
              <Grid item key={i} lg={4} md={4} sm={6} xs={12}>
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

                  <button>View job</button>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Detail;
