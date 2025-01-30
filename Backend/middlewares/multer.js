
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure the temp folder exists or create it
const uploadDirectory = path.join(__dirname, '../public/temp');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${file.originalname}`;
    cb(null, uniqueFilename);
  }
});

// Multer upload middleware
const upload = multer({
  storage
});

module.exports = { upload };