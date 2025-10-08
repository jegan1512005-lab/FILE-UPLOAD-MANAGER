const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Folder to store uploaded files
const UPLOAD_FOLDER = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Initialize multer upload
const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(UPLOAD_FOLDER));

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Get all uploaded files
app.get("/files", (req, res) => {
  fs.readdir(UPLOAD_FOLDER, (err, files) => {
    if (err) return res.status(500).json({ error: "Unable to read files" });
    res.json(files);
  });
});

// Delete a file
app.delete("/files/:filename", (req, res) => {
  const filePath = path.join(UPLOAD_FOLDER, req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete file" });
    res.json({ message: "File deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

