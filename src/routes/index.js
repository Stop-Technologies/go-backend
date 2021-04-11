var express = require('express');
var router = express.Router();

/* GET root route. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the go backend server');
});

module.exports = router;
