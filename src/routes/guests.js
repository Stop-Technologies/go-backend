const Router = require('express')
const router = Router()
const { verifyAccess } = require('../controllers/permissions')
const { find: findPerson } = require('../repositories/people')

router.get('/guests/access/:guest_id', (req, res) => {
  verifyAccess(req.params.guest_id, req.body.caller.place_id)
    .then(async (permission) => {
      person = await findPerson(req.params.guest_id)
      res.send({
        success: permission,
        name: person.name
      })
    })
    .catch((error) => {
      res.status(500)
        .send({
          success: false,
          error: error.message
        })
    })
})

module.exports = router
