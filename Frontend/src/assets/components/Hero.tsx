import React from "react";
type Props = {};

const Hero = (props: Props) => {
  return (
    <>
      <div className="hero">
        <img
          className="imgleft"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b2a817941bfa8c060d6853_shape-01.png"
          alt=""
        />
        <img
          className="imgright"
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b2a817941bfa8c060d6853_shape-01.png"
          alt=""
        />
        <div className="container">
          <p className="spot">A spot for creatives to get a job</p>
        </div>
        <div className="secondcont">
          <p className="get">
            Get your dream job, with offers from different countries and job
            positions. Apply today to get internships, fresher, work-from-home
            jobs.
          </p>
          <div className="search">
            <div className="left">
              <input
                type="text"
                className="input"
                placeholder="Search job or companies"
              />
              <button className="explore">Explore</button>
            </div>
            <p className="find">*Find the position and location to work</p>
          </div>
        </div>
      </div>
      <div className="photos">
        <div className="photocont">
          <div className="leftcloud">
            <img
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63bb96822801847ca9326ef1_message-bg.png"
              alt=""
            />
            <p className="first">I am looking</p>
            <p className="second">for a job</p>
          </div>
          <div className="rightcloud">
            <img
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63dddcaf3700f06d7eac20ff_message-bg-2.png"
              alt=""
            />
            <p className="first">We are</p>
            <p className="second">hiring!</p>
          </div>
          <img
            className="img"
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de309ecc6c4859122bdd09_element-03.svg"
            alt=""
          />
          <img
            className="img"
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de366a2ae9b04972be1313_people-02.svg"
            alt=""
          />
          <img
            className="img"
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de36751ca2f5a26708f75b_people-03.svg"
            alt=""
          />
          <img
            className="img"
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de367fdd1066708d158c07_people-04.svg"
            alt=""
          />
          <img
            className="img"
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de3125f46ebf6d657e51c7_people-05.svg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
