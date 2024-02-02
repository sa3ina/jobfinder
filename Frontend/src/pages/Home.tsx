import React from "react";
import Hero from "../assets/components/Hero";
import { Helmet } from "react-helmet";
import AboutSection from "../assets/components/AboutSection";
import FindJobSection from "../assets/components/FindJobSection";
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
      <FindJobSection />
    </>
  );
};

export default Home;
