import React from "react";
import Grid from "@mui/material/Grid";

type Props = {};

const FindJobSection = (props: Props) => {
  const arr = [1, 2, 3, 4, 5];
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
          {arr.map((elem, i) => {
            return (
              <div className="jobs">
                <div className="jobscont">
                  <img
                    src="https://assets-global.website-files.com/63b3bf674632664abc613903/63c7e048dbd85384ac3e7adf_skype.svg"
                    alt=""
                    className="jobicon"
                  />
                  <div className="inf">
                    <p className="jobname">Digital Marketing Manager</p>
                    <div className="location">
                      <img
                        src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b3cc6e4632663f9161e95a_geo-alt.svg"
                        alt=""
                      />
                      <p>Tokyo, Japan</p>
                    </div>
                  </div>
                </div>
                <p className="type">Internship</p>
                <button>View job</button>
              </div>
            );
          })}
          <button className="browse">Browse all jobs</button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FindJobSection;
