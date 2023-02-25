require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({
      message: `No files found.`,
    });
  }

  const file = req.files.file;

  // use path
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }

    res.json({
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
    });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
