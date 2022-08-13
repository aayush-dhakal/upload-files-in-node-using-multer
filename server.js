const path = require("path");

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "---" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});

app.post("/multiple", upload.array("images", 3), (req, res) => {
  // second parameter to the array is the number of maximum images allowed to upload
  console.log(req.files);
  res.send("Multiple files upload success");
});

app.listen(5000, () => {
  console.log("server is up");
});
