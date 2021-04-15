var express = require('express');
var router = express.Router();
var users = require('../models/user.js');
// This is only an example controller

/* GET users routes. */
router.get('/users', function(req, res, next) {
  users.findAll()
    .then((users) => {
      res.send({users: users, success: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, success: false});
    }))
});


/* POST users route. */
router.post('/users', function(req, res, next) {
  users.create(req.body.id, req.body.name, req.body.role, req.body.password)
    .then((user) => {
      res.send({user: user, success: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, success: false});
    }))
});


router.delete('/users', function(req, res, next) {
  users.delete(req.body.id)
  .then((user) => {
    res.send({user: user, success: true});
  })
  .catch(((error) => {
    res.status(500).send({error: error, success: false});
  }))
});

//TODO: Take this route to an authentication controller(And add security to this type of authentication)
router.post('/users/login', async function(req, res, next) {
  users.find(req.body.id).then((user) => {
      if (user.password.trim() == req.body.password) {
        res.send({success: true});
      } else {
        res.send({success: false});
      }
      
    })
    .catch(((error) => {
      res.status(500).send({error: error, success: false});
    }))
});

module.exports = router;
