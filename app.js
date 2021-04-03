var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs=require('fs');

var routesPath = './src/routes'
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

fs.readdir(routesPath, (err, files) => {
  files.forEach(file => {
    app.use('/', require(routesPath + '/' + file));
  });
});

module.exports = app;