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

      res.json(data);
    });
  });
});

router.post('/login', function(req, res) {
    connection.connect((err) => {
        if(err) {
          console.log('Error', err);
        };

        let login = {
            username: req.body.username,
            password: req.body.password
        };

        if(login.username && login.password) {
            let sql = `SELECT * FROM users WHERE username = '${login.username}'`;

            connection.query(sql, (err, data) => {
                if(err) {
                    console.log('Error: ', err);
                    res.status(401).json({message: 'Something went wrong'});
                };

                res.json(data);
            });
        };
    });
});

module.exports = router;
