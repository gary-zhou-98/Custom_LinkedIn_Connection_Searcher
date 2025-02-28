const express = require("express");
const multer = require("multer");
const { processCSVData } = require("../controllers/csvController");

const router = express.Router();

// Configure Multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for CSV file uploads
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const parsedCSV = await processCSVData(req.file.buffer);
    res.status(200).json({ data: parsedCSV });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

module.exports = router;
