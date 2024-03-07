const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001
const notes = require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to serve static files
app.use(express.static('public'));

// GET request for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// GET api request for db.json
app.get('/api/notes', (req, res) => {
    res.json(notes)
});

// POST request for new notes
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    if(title && text) {
        const newNote = {
            title,
            text,
            // id: uuid(),
        }
        // const noteString = JSON.stringify(newNote);
        fs.readFile('db/db.json', function (err, data){
            if (err) {
                console.error(err);
                return;
            }
            const json = JSON.parse(data);
            json.push(newNote);
            fs.writeFile('db/db.json', JSON.stringify(json), (err) => err ? console.log(err) : console.log('note saved'))
        })
        // fs.appendFile('db/db.json', noteString, (err) => 
        //     err ? console.log(err) : console.log('note saved'))

        const response = {
            status: 'success',
            body: newNote,
            };
          
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);