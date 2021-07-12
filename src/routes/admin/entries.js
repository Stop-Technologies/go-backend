const Router = require('express')
const router = Router()
const { authorize } = require('../../auth/service')
const entries = require('../../controllers/entries')

router.use(authorize(['admin']))

router.get('/', function (req, res) {
  entries.findAll()
    .then((entries) => {
      res.send({ entries: entries, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.get('/:id', function (req, res) {
  entries.find(req.params.id)
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
  entries.delete(req.params.id)
    .then((entry) => {
      if (entry) {
        res.send({ entry: entry, success: true })
      } else {
        res.status(500).send({ error: 'Entry not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})


module.exports = router
