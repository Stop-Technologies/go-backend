var express = require('express');
var router = express.Router();
var access = require('../models/access.js');
// This is only an example controller

/* GET access route. */
router.get('/access', function(req, res, next) {
  access.findAll()
    .then((access) => {
      res.send({access: access, sucess: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, sucess: false});
    }))
});

/* POST access route. */
router.post('/access', function(req, res, next) {
  access.create(req.body.id_place, req.body.id_user)
    .then((access) => {
      res.send({access: access, sucess: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, sucess: false});
    }))
});

router.delete('/access', function(req, res, next){
  access.delete(req.body.id)
  .then((resp) => {
    res.send({resp: resp, sucess: true});
  })
  .catch(((error) => {
    res.status(500).send({error: error, sucess: false});
  }))
});

module.exports = router;
