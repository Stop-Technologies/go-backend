const Router = require('express')
const router = Router()
const { authorize } = require('../../auth/service')
const guests = require('../../controllers/guests')

router.use(authorize(['admin']))

router.get('/', function (req, res) {
  guests.findAll()
    .then((guests) => {
      res.send({ guests: guests, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.get('/:id', function (req, res) {
  guests.find(req.params.id)
    .then((guest) => {
      if (guest) {
        res.send({ guest: guest, success: true })
      } else {
        res.status(500).send({ error: 'Guest not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.post('/', function (req, res) {
  guests.create(req.body.guest)
    .then((guest) => {
      res.send({ guest: guest, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.put('/:id', function (req, res) {
  guests.update(req.params.id, req.body.guest)
    .then((guest) => {
      if (guest) {
        res.send({ guest: guest, success: true })
      } else {
        res.status(500).send({ error: 'Guest not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.delete('/:id', function (req, res) {
  guests.delete(req.params.id)
    .then((guest) => {
      if (guest) {
        res.send({ guest: guest, success: true })
      } else {
        res.status(500).send({ error: 'Guest not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

module.exports = router
