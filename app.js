var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs=require('fs');
var mongoose = require('mongoose');
var config = require('./config/config.js');

var routePath = './routes'
var app = express();
//Set up mongoose connection
var mongoDB = config.db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

fs.readdir(routePath, (err, files) => {
  files.forEach(file => {
    app.use('/', require(routePath + '/' + file));
  });
});

module.exports = app;
