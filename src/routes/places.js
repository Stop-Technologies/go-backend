const express = require('express');
const router = express.Router();
const places = require('../models/place.js');

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
  places.create(req.body.capacity)
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
