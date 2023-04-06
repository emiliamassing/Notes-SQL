const express = require('express');
const router = express.Router();
const connection = require('./conn');

router.get('/', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error', err);
        };

        connection.query('SELECT * FROM documents', (err, data) => {
            if(err) {
                console.log('Error: ', err);
            };

            res.send(data);
        });
    });
});

router.post('/add', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error: ', err);
        };

        let newNote = {
            title: req.body.title,
            summary: req.body.summary,
            author: req.body.author,
            textContent: req.body.textContent
        };

        let sql = `INSERT INTO documents (title, summary, author, textContent) VALUES('${newNote.title}', '${newNote.summary}', '${newNote.author}', '${newNote.textContent}')`;

        connection.query(sql, (err, result) => {
            if(err) {
                console.log('Error: ', err);
            };

            console.log('New note', result);
            res.status(200).json(result);

        });
    });
});

module.exports = router;