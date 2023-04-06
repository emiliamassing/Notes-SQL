const express = require('express');
const router = express.Router();
const connection = require('./conn');

router.get('/', function(req, res) {
    connection.connect((err) => {
        if(err) {
            console.log('Error', err);
        };

        connection.query('SELECT * FROM users', (err, result) => {
            if(err) {
                console.log('Error: ', err);
            };

            res.send(result);
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

        connection.query(sql, (err, result) => {
            if(err) {
                console.log('Something went wrong');
            };

            if(result.length === 0) {
               return res.json({Error: 'User not found'});
            };

            res.json(result);
        });
    });
});

module.exports = router;
