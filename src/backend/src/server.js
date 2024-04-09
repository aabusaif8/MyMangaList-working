const express = require('express');
const cors = require('cors');

const app = require("./app");

// Enable CORS for all routes
app.use(cors());


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});