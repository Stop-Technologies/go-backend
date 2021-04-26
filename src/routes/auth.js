const express = require('express');
const router = express.Router();
const users = require('../models/user.js');
const guard = require('../util/security-helper');

router.post('/auth/login', async function(req, res, next) {
  users.find(req.body.id)
  .then((user) => {
    let hash = guard.generateHash(req.body.password, user.salt);
    if (user.hash == hash) {
      res.send({success: true});
    } else {
      res.send({success: false});
    }
  })
  .catch(((error) => {
    res.status(500).send({error: error, success: false});
  }));
});

module.exports = router;
  