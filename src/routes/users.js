const express = require('express');
const router = express.Router();
const users = require('../models/user.js');
const user_verification = require('../util/user_verification.js');

const users_path = 'users/'
/* GET users routes. */
router.get(users_path, function (req, res, next) {
  users.findAll()
    .then((users) => {
      res.send({ users: users, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
});


/* POST users route. */
router.post(users_path, function (req, res, next) {
  users.create(req.body.id, req.body.name, req.body.role, req.body.password)
    .then((user) => {
      res.send({ user: user, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
});


router.delete(users_path, function (req, res, next) {
  users.delete(req.body.id)
    .then((user) => {
      res.send({ user: user, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
});

router.get(users_path + '/verify/:id', (req, res, next) => {
  /*users.find(req.body.id)
    .then((user) => {
      user_verification(user, (err, success)) => {
        if (err) {

        } else {

        }
      }
    })*/
}
)

module.exports = router;
