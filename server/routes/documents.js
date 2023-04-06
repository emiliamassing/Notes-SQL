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
            textContent: req.body.textContent
        };
    });
})