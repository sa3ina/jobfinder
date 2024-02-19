const express = require("express");
const app = express();
const port = 3000;
require("./config/db");
const PhotoModel = require("./models/PhotoModel");
const jobseekerRouter = require("./routes/JobseekerRoute");
const employerRouter = require("./routes/EmployerRoute");
const jobsRouter = require("./routes/JobsRoute");
const adminRouter = require("./routes/AdminRoute");
const commentRouter = require("./routes/CommentRoute");

var bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/", jobseekerRouter);
app.use("/", employerRouter);
app.use("/", jobsRouter);
app.use("/", adminRouter);
app.use("/", commentRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = "./uploads/";
    console.log("Destination:", uploadFolder);
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Invalid file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }

  cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
});
app.post("/photos", upload.single("imageFile"), async (req, res) => {
  try {
    const useremail = req.body.useremail;

    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const newUser = new PhotoModel({
      useremail: useremail,
      profilePicture: req.file,
    });

    await newUser.save();

    res.status(200).json({
      message: "File uploaded successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "LIMIT_FILE_TYPES") {
      return res.status(400).json({
        message: "Invalid file type. Allowed types: JPEG, PNG, MP4",
      });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/photos", async (req, res) => {
  try {
    const users = await PhotoModel.find();
    res.send({ users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
