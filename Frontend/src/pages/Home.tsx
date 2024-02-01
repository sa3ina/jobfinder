import React from "react";
import Hero from "../assets/components/Hero";
import { Helmet } from "react-helmet";
import AboutSection from "../assets/components/AboutSection";
const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Jobhunt</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Hero />
      <AboutSection />
    </>
  );
};

export default Home;
