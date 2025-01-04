const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const app = express();
const port = 3000;

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  }
});

const upload = multer({ storage: storage });

// Middleware for serving static files (e.g., HTML, CSS)
app.use(express.static('public'));

// Create a directory for uploads if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Route to export JSON data
app.get('/export', (req, res) => {
  const data = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'San Francisco' }
  ];

  const jsonData = JSON.stringify(data);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="data.json"');
  res.send(jsonData);
});

// Route to export CSV data
app.get('/export-csv', (req, res) => {
  const data = [
    ['Name', 'Age', 'City'],
    ['John Doe', 30, 'New York'],
    ['Jane Smith', 25, 'San Francisco']
  ];

  const csv = Papa.unparse(data);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
  res.send(csv);
});

// Route to import a file
app.post('/import', upload.single('file'), (req, res) => {
  if (req.file) {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const extname = path.extname(req.file.originalname);

    if (extname === '.csv') {
      // Parse CSV file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send('Error reading file');
        }

        Papa.parse(data, {
          complete: function (results) {
            res.json({ message: 'CSV file imported successfully', data: results.data });
          },
          error: function (error) {
            res.status(500).send('Error parsing CSV file');
          }
        });
      });
    } else if (extname === '.json') {
      // Parse JSON file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send('Error reading file');
        }

        const jsonData = JSON.parse(data);
        res.json({ message: 'JSON file imported successfully', data: jsonData });
      });
    } else {
      res.status(400).send('Invalid file format');
    }
  } else {
    res.status(400).send('No file uploaded');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
