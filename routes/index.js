var express = require('express');
var router = express.Router();

/* GET root route. */
router.get('/', function(req, res, next) {
  res.send('Go backend server');
});

module.exports = router;
