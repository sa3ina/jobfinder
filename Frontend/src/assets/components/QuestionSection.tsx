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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  className={`inc ${isAccordionOpen ? "rotate" : ""}`}
                />
                Interested has all Devonshire difficulty?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Unaffected at ye of compliment alteration to. Place voice no
                arises along to. Parlors waiting so against me no. Wishing
                calling is warrant settled was lucky. Express besides it present
                if at an opinion visitor.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen2}
              onChange={handleAccordionChange2}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen2 ? "rotate" : ""}`}
                />
                Unaffected at ye of compliment alteration?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Unaffected at ye of compliment alteration to. Place voice no
                arises along to. Parlors waiting so against me no. Wishing
                calling is warrant settled was lucky. Express besides it present
                if at an opinion visitor.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen3}
              onChange={handleAccordionChange3}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen3 ? "rotate" : ""}`}
                />
                Place voice no arises along to?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Unaffected at ye of compliment alteration to. Place voice no
                arises along to. Parlors waiting so against me no. Wishing
                calling is warrant settled was lucky. Express besides it present
                if at an opinion visitor.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen4}
              onChange={handleAccordionChange4}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen4 ? "rotate" : ""}`}
                />
                Particular way thoroughly unaffected?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Unaffected at ye of compliment alteration to. Place voice no
                arises along to. Parlors waiting so against me no. Wishing
                calling is warrant settled was lucky. Express besides it present
                if at an opinion visitor.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen5}
              onChange={handleAccordionChange5}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen5 ? "rotate" : ""}`}
                />
                Yet uncommonly his ten who diminution?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Unaffected at ye of compliment alteration to. Place voice no
                arises along to. Parlors waiting so against me no. Wishing
                calling is warrant settled was lucky. Express besides it present
                if at an opinion visitor.
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="accordion"
              expanded={isAccordionOpen6}
              onChange={handleAccordionChange6}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                className="question"
              >
                <img
                  src="https://assets-global.website-files.com/63b2816edd90444c9df54d80/63c1134ebb52da0f9b28dfe9_close.svg"
                  alt=""
                  className={`inc ${isAccordionOpen6 ? "rotate" : ""}`}
                />
                Family months lasted simple set nature?
              </AccordionSummary>
              <AccordionDetails className="answer">
                Unaffected at ye of compliment alteration to. Place voice no
                arises along to. Parlors waiting so against me no. Wishing
                calling is warrant settled was lucky. Express besides it present
                if at an opinion visitor.
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionSection;
