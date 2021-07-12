const Router = require('express')
const router = Router()
const { authorize } = require('../../auth/service')
const places = require('../../controllers/places')
const { countCurrentGuests } = require('../../controllers/entries')

router.use(authorize(['admin']))

router.get('/', function (req, res) {
  places.findAll()
    .then((places) => {
      res.send({ places: places, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.get('/:id', function (req, res) {
  places.find(req.params.id)
    .then((place) => {
      if (place) {
        res.send({ place: place, success: true })
      } else {
        res.status(500).send({ error: 'Place not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.post('/', function (req, res) {
  places.create(req.body.place)
    .then((place) => {
      res.send({ place: place, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.put('/:id', function (req, res) {
  places.update(req.params.id, req.body.place)
    .then((place) => {
      if (place) {
        res.send({ place: place, success: true })
      } else {
        res.status(500).send({ error: 'Place not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.delete('/:id', function (req, res) {
  places.delete(req.params.id)
    .then((place) => {
      if (place) {
        res.send({ place: place, success: true })
      } else {
        res.status(500).send({ error: 'Place not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})


router.get('/:id/current_guests', function (req, res) {
  places.find(req.params.id)
    .then((place) => {
      if (place) {
        countCurrentGuests(place.id)
        .then((currentUsers) => {
          if (currentUsers != false){
            res.send({ currentUsers: currentUsers, success: true })
          }else{
            res.status(500).send({ error: 'Guests not found', success: false })
          }
        })
      } else {
        res.status(500).send({ error: 'Place not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

module.exports = router
