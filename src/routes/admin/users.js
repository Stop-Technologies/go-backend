const Router = require('express')
const router = Router()
const { authorize } = require('../../auth/service')
const users = require('../../controllers/users')

function verifyUserRole(roles) {
  return async function (req, res, next) {
    var user = await users.find(req.params.id)
    console.log(user)
    if (user) {
      if (roles.includes(user.role)) {
        next()
      } else {
        res.status(500).send({ error: `User is not in roles: ${roles}`, success: false })
      }
    } else {
      res.status(500).send({ error: "Cannot find user", success: false })
    }
  }
}

router.use(authorize(['admin']))

router.get('/', function (req, res) {
  users.findAll()
    .then((users) => {
      res.send({ users: users, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.get('/:id', function (req, res) {
  users.find(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ user: user, success: true })
      } else {
        res.status(500).send({ error: 'User not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.post('/', function (req, res) {
  users.create(req.body.user)
    .then((user) => {
      res.send({ user: user, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.put('/:id', verifyUserRole(['moderator']), function (req, res) {
  users.update(req.params.id, req.body.user)
    .then((user) => {
      if (user) {
        res.send({ user: user, success: true })
      } else {
        res.status(500).send({ error: 'User not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.delete('/:id', verifyUserRole(['moderator']), function (req, res) {
  users.delete(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ user: user, success: true })
      } else {
        res.status(500).send({ error: 'User not found', success: false })
      }
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

module.exports = router
