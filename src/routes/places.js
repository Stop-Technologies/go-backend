var express = require('express');
var router = express.Router();
var places = require('../models/place.js');
// This is only an example controller

/* GET places route. */
router.get('/places', function(req, res, next) {
  places.findAll()
    .then((places) => {
      res.send({places: places, sucess: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, sucess: false});
    }))
});

/* POST places route. */
router.post('/places', function(req, res, next) {
  console.log(req.body)
  places.create(req.body.access_capacity)
    .then((place) => {
      place.send({place: place, sucess: true});
    })
    .catch(((error) => {
      res.status(500).send({error: error, sucess: false});
    }))
});

router.delete('/places', function(req, res, next){
  console.log(req.body)
  places.delete(req.body.id)
  .then((place) => {
    res.send({place: place, sucess: true});
  })
  .catch(((error) => {
    res.status(500).send({error: error, sucess: false});
  }))
});

module.exports = router;
