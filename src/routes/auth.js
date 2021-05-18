const Router = require('express')
const router = Router()
const { login } = require('../controllers/auth')

router.post('/auth/login', async function(req, res) {
  login(req.body.id, req.body.password)
    .then((token) => {
      res.send({
        success: true,
        token: token
      })
    })
    .catch(((error) => {
      res.status(500)
        .send({
          success: false,
          error: error.message
        })
    }))
})

module.exports = router
