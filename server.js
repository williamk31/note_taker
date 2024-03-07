const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001

// middleware to serve static files
app.use(express.static('public'));

// GET request for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);