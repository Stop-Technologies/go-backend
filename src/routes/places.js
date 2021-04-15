var express = require('express');
var router = express.Router();
var places = require('../models/place.js');
// This is only an example controller

/* GET places route. */
router.get('/places', function(req, res, next) {
  places.findAll()
    .then((places) => {
      res.send({places: places, success: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, success: false});
    }))
});

/* POST places route. */
router.post('/places', function(req, res, next) {
  places.create(req.body.access_capacity)
    .then((place) => {
      res.send({place: place, success: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, success: false});
    }))
});

router.delete('/places', function(req, res, next){
  places.delete(req.body.id)
  .then((place) => {
    res.send({place: place, success: true});
  })
  .catch(((error) => {
    res.status(500).send({error: error, success: false});
  }))
});

module.exports = router;
