const express = require('express');
const router = express.Router();
const permissions = require('../models/permission.js');

/* GET permissions route. */
router.get('/permissions', function(req, res, next) {
  permissions.findAll()
    .then((permissions) => {
      res.send({permissions: permissions, success: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, success: false});
    }))
});

/* POST permissions route. */
router.post('/permissions', function(req, res, next) {
  permissions.create(req.body.user_id, req.body.period)
    .then((place) => {
      res.send({place: place, success: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, success: false});
    }))
});

router.delete('/permissions', function(req, res, next){
  permissions.delete(req.body.id)
  .then((place) => {
    res.send({place: place, success: true});
  })
  .catch(((error) => {
    res.status(500).send({error: error, success: false});
  }))
});



module.exports = router;
