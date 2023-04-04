const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const connection = require('./routes/conn');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

connection.connect(function(err) {
    if(err) {
        console.log('Error: ', err);
    };

    console.log('Connected to database');
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
