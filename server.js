const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());

// Define the GET endpoint
app.get('/calculate-age', (req, res) => {
  const { dob } = req.query;

  if (!dob) {
    return res.status(400).json({ error: 'Date of birth is required as a query parameter (dob).' });
  }

  // Parse the DOB string to a Date object
  const dobDate = new Date(dob);

  if (isNaN(dobDate)) {
    return res.status(400).json({ error: 'Invalid date of birth format. Please use YYYY-MM-DD.' });
  }

  // Calculate age
  const currentDate = new Date();
  const age = Math.floor((currentDate - dobDate) / (365.25 * 24 * 60 * 60 * 1000));

  res.json({ age });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
