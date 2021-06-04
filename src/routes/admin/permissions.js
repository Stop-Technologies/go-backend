const Router = require('express')
const router = Router()
const { authorize } = require('../../auth/service')
const permissions = require('../../controllers/permissions')

router.use(authorize(['admin']))

router.get('/', function (req, res) {
  permissions.findAll()
    .then((permissions) => {
      res.send({ permissions: permissions, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.get('/:id', function (req, res) {
  permissions.find(req.params.id)
    .then((permission) => {
      if (permission) {
        res.send({ permission: permission, success: true })
      } else {
        res.status(500).send({ error: 'Permission not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.post('/', function (req, res) {
  permissions.create(req.body.permission)
    .then((permission) => {
      res.send({ permission: permission, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.put('/:id', function (req, res) {
  permissions.update(req.params.id, req.body.permission)
    .then((permission) => {
      if (permission) {
        res.send({ permission: permission, success: true })
      } else {
        res.status(500).send({ error: 'Permission not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.delete('/:id', function (req, res) {
  permissions.delete(req.params.id)
    .then((permission) => {
      if (permission) {
        res.send({ permission: permission, success: true })
      } else {
        res.status(500).send({ error: 'Permission not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

module.exports = router
