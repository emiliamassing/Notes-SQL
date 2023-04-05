const express = require('express');
const router = express.Router();
const connection = require('./conn');

router.get('/', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error', err);
        };

        connection.query('SELECT * FROM users', (err, data) => {
            if(err) {
                console.log('Error: ', err);
            };

            res.send(data);
        });
    });
});

router.post('/login', function(req, res) {
    let login = {
        username: req.body.username,
        password: req.body.password
    };

    connection.connect(function(err) {
        if(err) {
          console.log('Error', err);
        };
    
        let sql = `SELECT * FROM users WHERE username = '${login.username}' AND password = '${login.password}'`;

        connection.query(sql, (err, data) => {
            if(err) {
                console.log('Something went wrong');
            };

            if(data.length === 0) {
               return res.json({Error: 'User not found'});
            };

            res.json(data);
        });
    });
});

module.exports = router;
