var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs=require('fs');

var routesPath = './src/routes';
var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Utility function to mount all the files in the routes folder
function mountRoutes(app, route, prefix) {
  fs.readdir(route, (err, files) => {
    files.forEach(file => {
      if (fs.statSync(route + '/' + file).isFile()) {
        var path = prefix + file.replace(/\.[^/.]+$/, "") + '/';
        if (file === 'index.js') {
          path = prefix;
        }
        app.use(path, require(route + '/' + file));
      } else {
        mountRoutes(app, route + '/' + file, prefix + file + '/');
      }
    });
  });
}

mountRoutes(app, routesPath, '/');

module.exports = app;
