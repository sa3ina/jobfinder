//@ts-nocheck
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const questions = [
  {
    id: 1,
    question: "What steps should I take to create an effective resume?",
    answer:
      "To create an effective resume, start by clearly outlining your contact information, followed by a summary or objective statement that highlights your skills and experiences relevant to the job you're applying for.",
  },
  {
    id: 2,
    question: "How can I prepare for a job interview?",
    answer:
      "Preparation for a job interview is key to success. Research the company and its culture, understand the job requirements, and practice answering common interview questions.",
  },
  {
    id: 3,
    question:
      "What are some effective strategies for networking to find job opportunities?",
    answer:
      "Networking is a valuable tool for finding job opportunities. Start by reaching out to your existing contacts, including friends, family, former colleagues, and alumni networks.",
  },
  {
    id: 4,
    question: "How can I stand out as a candidate in a competitive job market?",
    answer:
      "To stand out in a competitive job market, focus on highlighting your unique skills, experiences, and achievements.",
  },
  {
    id: 5,
    question: "How can I negotiate my salary and benefits package?",
    answer:
      "Practice effective communication and active listening during negotiations, and be willing to compromise when necessary.",
  },
  {
    id: 6,
    question: "How can I use a website to find relevant job opportunities?",
    answer:
      "Actively search and apply for positions that align with your qualifications and career goals.",
  },
];

const QuestionSection = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAccordionChange = (id: number) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
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
                  alt="App Store"
                  className="store"
                />
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63b41b341b6d289e9bef3836_google-play.svg"
                  alt="Google Play"
                  className="store"
                />
              </div>
            </div>
            <img
              src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63de1eff6bf1b121085ccfd7_element-01.png"
              alt="Mobile App"
              className="mobile"
            />
          </div>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <p className="most">Most asked questions</p>
          <div className="accordioncont">
            {questions.map((item) => (
              <Accordion
                key={item.id}
                className="accordion"
                expanded={openAccordion === item.id}
                onChange={() => handleAccordionChange(item.id)}
              >
                <AccordionSummary
                  aria-controls={`panel${item.id}-content`}
                  id={`panel${item.id}-header`}
                  className="question"
                >
                  <img
                    src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                    alt=""
                    className={`inc ${
                      openAccordion === item.id ? "rotate" : ""
                    }`}
                  />
                  {item.question}
                </AccordionSummary>
                <AccordionDetails className="answer">
                  {item.answer}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionSection;
