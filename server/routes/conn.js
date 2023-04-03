const mysql = require('mysql2');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'noteapplication'
});

module.exports = connection;