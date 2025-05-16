const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use(
  "/upload_images",
  express.static(path.join(__dirname, "..", "upload_images"))
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "upload_images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.array("files"), (req, res) => {
  res.status(200).json({ message: "Files uploaded successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
