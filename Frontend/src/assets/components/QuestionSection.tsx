import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
9;
type Props = {};

const QuestionSection = (props: Props) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAccordionOpen2, setIsAccordionOpen2] = useState(false);
  const [isAccordionOpen3, setIsAccordionOpen3] = useState(false);
  const [isAccordionOpen4, setIsAccordionOpen4] = useState(false);
  const [isAccordionOpen5, setIsAccordionOpen5] = useState(false);
  const [isAccordionOpen6, setIsAccordionOpen6] = useState(false);
  const handleAccordionChange = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  const handleAccordionChange2 = () => {
    setIsAccordionOpen2(!isAccordionOpen2);
  };
  const handleAccordionChange3 = () => {
    setIsAccordionOpen3(!isAccordionOpen3);
  };
  const handleAccordionChange4 = () => {
    setIsAccordionOpen4(!isAccordionOpen4);
  };
  const handleAccordionChange5 = () => {
    setIsAccordionOpen5(!isAccordionOpen5);
  };
  const handleAccordionChange6 = () => {
    setIsAccordionOpen6(!isAccordionOpen6);
  };
  return (
    <div className="questions">
      <Grid container className="questiongrid" spacing={11}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className="app">
            <div className="images">
              <p className="download">Download the application now</p>
              <div className="image">
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b41b3470734302ac46538f_app-store.svg"
                  alt=""
                  className="store"
                />
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b41b341b6d289e9bef3836_google-play.svg"
                  alt=""
                  className="store"
                />
              </div>
            </div>
            <img
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de1eff6bf1b121085ccfd7_element-01.png"
              alt=""
              className="mobile"
            />
          </div>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <p className="most">Most asked questions</p>
          <div className="accordioncont">
            <Accordion
              className="accordion"
              expanded={isAccordionOpen}
              onChange={handleAccordionChange}
            >
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  className={`inc ${isAccordionOpen ? "rotate" : ""}`}
                />
                What steps should I take to create an effective resume?
              </AccordionSummary>
              <AccordionDetails className="answer">
                To create an effective resume, start by clearly outlining your
                contact information, followed by a summary or objective
                statement that highlights your skills and experiences relevant
                to the job you're applying for.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen2}
              onChange={handleAccordionChange2}
            >
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen2 ? "rotate" : ""}`}
                />
                How can I prepare for a job interview?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Preparation for a job interview is key to success. Research the
                company and its culture, understand the job requirements, and
                practice answering common interview questions. Be ready to
                discuss your experiences and how they relate to the position.
                Dress professionally, arrive early, and bring extra copies of
                your resume.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen3}
              onChange={handleAccordionChange3}
            >
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen3 ? "rotate" : ""}`}
                />
                What are some effective strategies for networking to find job
                opportunities?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Networking is a valuable tool for finding job opportunities.
                Start by reaching out to your existing contacts, including
                friends, family, former colleagues, and alumni networks. Attend
                industry events, job fairs, and professional meetups to expand
                your network.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen4}
              onChange={handleAccordionChange4}
            >
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen4 ? "rotate" : ""}`}
                />
                How can I stand out as a candidate in a competitive job market?
              </AccordionSummary>
              <AccordionDetails className="answer">
                To stand out in a competitive job market, focus on highlighting
                your unique skills, experiences, and achievements. Customize
                your resume and cover letter for each application to demonstrate
                your fit for the specific role and company.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen5}
              onChange={handleAccordionChange5}
            >
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen5 ? "rotate" : ""}`}
                />
                How can I negotiate my salary and benefits package?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Practice effective communication and active listening during
                negotiations, and be willing to compromise when necessary.
                Remember to consider the overall package, including benefits,
                perks, and opportunities for growth, when evaluating offers.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen6}
              onChange={handleAccordionChange6}
            >
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen6 ? "rotate" : ""}`}
                />
                How can i use website to find relevant job opportunities?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Actively search and apply for positions that align with your
                qualifications and career goals. Additionally, leverage the
                networking features of these platforms to connect with
                recruiters, hiring managers, and professionals in your field.
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionSection;
