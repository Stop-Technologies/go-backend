var express = require('express');
var router = express.Router();
var users = require('../models/user.js');
// This is only an example controller

/* GET users route. */
router.get('/users', function(req, res, next) {
  users.findAll()
    .then((users) => {
      res.send({users: users, sucess: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, sucess: false});
    }))
});

/* POST users route. */
router.post('/users', function(req, res, next) {
  console.log(req.body)
  users.create(req.body.email, req.body.password)
    .then((user) => {
      res.send({user: user, sucess: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, sucess: false});
    }))
});

module.exports = router;
