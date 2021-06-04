const Router = require('express')
const router = Router()
const { authorize } = require('../auth/service')
const users = require("../controllers/users")

router.use(authorize(['admin', 'moderator']))

router.get('/', function (req, res) {
  users.find(res.locals.user.id)
    .then((user) => {
      res.send({ user: user, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.put('/password', function (req, res) {
  users.changePassword(res.locals.user.id, req.body.password, req.body.new_password)
    .then((user) => {
      console.log(user)
      res.send({ user: user, success: true, message: "Password updated" })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

router.put('/', function (req, res) {
  users.updateName(res.locals.user.id, req.body.user)
    .then((user) => {
      res.send({ user: user, success: true })
    })
    .catch(((error) => {
      res.status(500).send({ error: error.message, success: false })
    }))
})

module.exports = router
