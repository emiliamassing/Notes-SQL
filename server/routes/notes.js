const express = require('express');
const router = express.Router();
const connection = require('./conn');

router.get('/', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error', err);
        };

        connection.query('SELECT * FROM notes', (err, data) => {
            if(err) {
                console.log('Error: ', err);
            };

            res.send(data);
        });
    });
});