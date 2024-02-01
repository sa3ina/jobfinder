import React from "react";
import Grid from "@mui/material/Grid";
type Props = {};

const AboutSection = (props: Props) => {
  return (
    <div className="about">
      <div className="aboutcont">
        <p className="supposing">
          Supposing so be resolving breakfast am or perfectly. It drew a hill
          from me. Valley by oh twenty direct me so. Departure defective
          arranging rapturous did believe him all had supported. Family months
          lasted simple set nature vulgar him. Picture for attempt joy excited
          ten carried manners talking how.
        </p>
        <p className="passage">
          Passage its ten led hearted removal cordial. Preference any astonished
          unreserved Mrs. Prosperous understood Middletons in conviction an
          uncommonly do. Supposing so be resolving breakfast am or perfectly. Is
          drew am hill from me.
        </p>
        <button>Know about us</button>
      </div>

      <Grid container className="grid">
        <Grid item lg={3} md={6} sm={6} xs={12} className="griditem">
          <img
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63ddf2c16af00b6ad3362796_icon-01.svg"
            alt=""
          />
          <p className="top">Apply to humans</p>
          <p className="bottom">
            Handsome met debating sir dwelling age material. As style lived he
            worse dried.
          </p>
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12} className="griditem">
          <img
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63ddf2dae4e25f67abe9a15e_icon-02.svg"
            alt=""
          />
          <p className="top">Fast and easy</p>
          <p className="bottom">
            Speedily say has suitable disposal add boy. On fourth doubt miles of
            child.
          </p>
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12} className="griditem">
          <img
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63ddf2e7dd106655ba11e466_icon-03.svg"
            alt=""
          />
          <p className="top">Instantly stand out</p>
          <p className="bottom">
            Prosperous understood Middletons in conviction an uncommonly do
          </p>
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12} className="griditem">
          <img
            src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63ddf2f211b8731683906c29_icon-04.svg"
            alt=""
          />
          <p className="top">Real time feedback</p>
          <p className="bottom">
            Supposing so be resolving breakfast am or perfectly months lasted.
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutSection;
