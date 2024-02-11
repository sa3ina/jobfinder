const express = require("express");
const app = express();
const port = 3000;
require("./config/db");
const jobseekerRouter = require("./routes/JobseekerRoute");
const employerRouter = require("./routes/EmployerRoute");
const jobsRouter = require("./routes/JobsRoute");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/", jobseekerRouter);
app.use("/", employerRouter);
app.use("/", jobsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
