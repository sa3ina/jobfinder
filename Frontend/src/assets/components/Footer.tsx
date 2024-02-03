import React from "react";
import Grid from "@mui/material/Grid";
type Props = {};

const Footer = (props: Props) => {
  return (
    <Grid container className="footer">
      <img
        src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b2a817941bfa8c060d6853_shape-01.png"
        alt=""
        className="background"
      />
      <img
        src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b2a817941bfa8c060d6853_shape-01.png"
        alt=""
        className="background2"
      />
      <Grid item lg={3} md={6} sm={6} xs={12}>
        <img
          src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de1e5d01f0364cbcba47a7_Jobhunt.svg"
          alt=""
        />
      </Grid>
      <Grid item lg={3} md={6} sm={6} xs={12} className="sect">
        <p className="strong">Pages</p>
        <p className="normal">Home</p>
        <p className="normal">About Us</p>
        <p className="normal">Jobs</p>
        <p className="normal">Blog</p>
        <p className="normal">Companies</p>
      </Grid>
      <Grid item lg={3} md={6} sm={6} xs={12} className="sect">
        <p className="strong">Style Guide</p>
        <p className="normal">Licenses</p>
        <p className="normal">Instructions</p>
        <p className="normal">Changelog</p>
        <p className="normal">404 Not Found</p>
        <p className="normal">Protected Password</p>
      </Grid>
      <Grid item lg={3} md={6} sm={6} xs={12} className="sect">
        <p className="strong">Locations</p>
        <p className="normal">2120 W Spring St, California, USA</p>
        <p className="normal">1714 County Road 1, London, UK</p>
        <p className="normal">1399 Diamond Dr, New York, US</p>
        <p className="normal">16880 Southcenter Pkwy, Japan</p>
      </Grid>
    </Grid>
  );
};

export default Footer;
