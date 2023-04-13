const express = require('express');
const router = express.Router();
const connection = require('./conn');

router.get('/', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error', err);
        };

        connection.query('SELECT * FROM documents', (err, result) => {
            if(err) {
                console.log('Error: ', err);
            };

            res.status(200).json(result);
        });
    });
});

router.get('/:id', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error', err);
        };

        let documentId = req.params.id;

        let sql = `SELECT * FROM documents WHERE noteId=${documentId}`;

        connection.query(sql, (err, result) => {
            if(err) {
                console.log('Error: ', err);
            };

            res.send(result);
        });
    });
});

router.post('/add', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error: ', err);
        };

        let escTitle = connection.escape(req.body.title);
        let escSummary = connection.escape(req.body.summary);
        let escAuthor = connection.escape(req.body.author);
        let escTextContent = connection.escape(req.body.textContent);

        let sql = `INSERT INTO documents (title, summary, author, textContent) VALUES(${escTitle}, ${escSummary}, ${escAuthor}, ${escTextContent})`;

        connection.query(sql, (err, result) => {
            if(err) {
                console.log('Error: ', err);
            };

            console.log('New note', result);
            res.status(200).json(result);

        });
    });
});

router.post('/edit/:id', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error: ', err);
        };

        let escTitle = connection.escape(req.body.title);
        let escSummary = connection.escape(req.body.summary);
        let escAuthor = connection.escape(req.body.author);
        let escTextContent = connection.escape(req.body.textContent);

        let documentId = req.params.id;

        let sql = `UPDATE documents SET title =${escTitle}, summary =${escSummary}, author =${escAuthor}, textContent =${escTextContent} WHERE noteId = ${documentId}`;

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