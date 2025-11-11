
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Serve all public files
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// POST route for the Mad Lib
app.post("/ITC505/lab-7/submit", (req, res) => {
  const { animal, adjective, verb, object, number } = req.body;

  // Basic validation
  if (!animal || !adjective || !verb || !object || !number) {
    return res.send(`
        <h1>Form Error</h1>
        <p>Please fill out every field before submitting.</p>
        <a href="/ITC505/lab-7/index.html">Return to Form</a>
    `);
  }

  const story = `
    One day, I encountered a ${adjective} ${animal} holding a ${object}.
    Without warning, it decided to ${verb} exactly ${number} times.
    It was the strangest moment I had ever experienced.
  `;

  res.send(`
    <h1>Your Mad Lib Story</h1>
    <p>${story}</p>
    <a href="/ITC505/lab-7/index.html">Create Another</a>
  `);
});

// Start server (Render uses process.env.PORT)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
