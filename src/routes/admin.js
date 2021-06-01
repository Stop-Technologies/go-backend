// TODO
// get post put
// admin/guests
// admin/places
// admin/permissions -> Recibe (startDay, endDay, startTime, endTime)
//                      y guarda un rango en la base de datos.
//                      Aparte de place_id y guest_id.
// admin/users -> el user a modificar o crear no puede ser un admin.
//                solo se pueden crear users con role "moderator".

const Router = require('express')
const router = Router()
const guest = require('../controllers/guest')
const place = require('../controllers/place')
const permissions = require('../controllers/permission')
module.exports = router

// admin/guest

router.get('/admin/guest', function (req, res, next) {
  guest.find()
    .then((guests) => {
      res.send({ guests: guests, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.get('/admin/guest/:id', function (req, res, next) {
  guest.find(req.params.id)
    .then((guests) => {
      res.send({ guests: guests, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.post('/admin/guest', function (req, res, next) {
  guest.find(req.body.id)
    .then((guest) => {
      res.send({ guest: guest, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})


router.put('/admin/guest/:id', function (req, res, next) {
  guest.update(req.params.id, req.body.id)
    .then((guest) => {
      res.send({ guest: guest, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})


// admin/places

router.get('/admin/places', function (req, res, next) {
  place.find()
    .then((places) => {
      res.send({ places: places, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.get('/admin/places/:id', function (req, res, next) {
  place.find(req.params.id)
    .then((place) => {
      res.send({ place: place, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.post('/admin/place', function (req, res, next) {
  place.create(req.body.id, req.body.name)
    .then((place) => {
      res.send({ place: place, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})


router.put('/admin/place/:id', function (req, res, next) {
  place.update(req.body.id, req.body.name)
    .then((place) => {
      res.send({ place: place, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

// admin/permissions

router.get('/admin/permissions', function (req, res, next) {
  permission.find()
    .then((permissions) => {
      res.send({ permissions: permissions, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.get('/admin/permissions/:id', function (req, res, next) {
  permission.find(req.params.id)
    .then((permission) => {
      res.send({ permission: permission, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.post('/admin/permission', function (req, res, next) {
  permission.create(req.body.startDay, req.body.endDay,
    req.body.startTime, req.body.endTime)
    .then((permission) => {
      res.send({ permission: permission, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.put('/admin/permission/:id', function (req, res, next) {
  permission.update(req.params.id,req.body.startDay, req.body.endDay,
    req.body.startTime, req.body.endTime)
    .then((permission) => {
      res.send({ permission: permission, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})