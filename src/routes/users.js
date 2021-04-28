const express = require('express');
const permission = require('../models/permission.js');
const router = express.Router();
const users = require('../models/user.js');
const user_verification = require('../util/user_verification.js');


/* GET users routes. */
router.get('/users', function (req, res, next) {
  users.findAll()
    .then((users) => {
      res.send({ users: users, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
});


/* POST users route. */
router.post('/users', function (req, res, next) {
  users.create(req.body.id, req.body.name, req.body.role, req.body.password)
    .then((user) => {
      res.send({ user: user, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
});


router.delete('/users', function (req, res, next) {
  users.delete(req.body.id)
    .then((user) => {
      res.send({ user: user, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
});

router.get('/users/verify/:id', (req, res, next) => {
  user_verification(req.params.id, res, (result, error) => {
    if (error == null) {
      res.send({ access_user: result, error: null });
    }
  })
});


module.exports = router;