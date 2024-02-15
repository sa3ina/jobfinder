const express = require("express");
const app = express();
const port = 3000;
require("./config/db");
const jobseekerRouter = require("./routes/JobseekerRoute");
const employerRouter = require("./routes/EmployerRoute");
const jobsRouter = require("./routes/JobsRoute");
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
const arr = [];

// Set up storage for uploaded files
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

// File validation function
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
//users post request
// app.post("/photos", upload.single("imageFile"), (req, res) => {
//   // try {
//   //   const username = req.body.username;
//   //   // Check if a file was provided in the request
//   //   if (!req.file) {
//   //     throw new Error("No file uploaded");
//   //   }

//   //   // Read the profile picture file
//   //   const profilePictureBase =
//   //     `data:${req.file.mimetype};base64,` +
//   //     fs.readFileSync(req.file.path, "base64");

//   //   // Delete the uploaded file as it's already read
//   //   fs.unlinkSync(req.file.path);
//   //   console.log("File path:", req.file.path);
//   //   const newUser = {
//   //     username: username,
//   //     profilePicture: profilePictureBase,
//   //   };

//   //   arr.push(newUser);
//   //   res.send({
//   //     message: "File uploaded successfully!",
//   //     data: newUser,
//   //   });
//   //   console.log(req.file);
//   // } catch (error) {
//   //   console.error(error);

//   //   // Handle specific file upload errors
//   //   if (error.code === "LIMIT_FILE_TYPES") {
//   //     return res
//   //       .status(400)
//   //       .json({ message: "Invalid file type. Allowed types: JPEG, PNG, MP4" });
//   //   }

//   //   res.status(500).json({ message: "Internal Server Error" });
//   // }
//   res.status(200).json(req.file);
// });
app.post("/photos", upload.single("imageFile"), (req, res) => {
  try {
    const useremail = req.body.useremail;

    // Check if a file was provided in the request
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const newUser = {
      useremail: useremail,
      profilePicture: req.file,
    };

    arr.push(newUser);
    res.status(200).json({
      message: "File uploaded successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error(error);

    // Handle specific file upload errors
    if (error.code === "LIMIT_FILE_TYPES") {
      return res.status(400).json({
        message: "Invalid file type. Allowed types: JPEG, PNG, MP4",
      });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/photos", (req, res) => {
  res.send({ users: arr });
});

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
