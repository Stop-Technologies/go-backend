const Router = require('express')
const router = Router()
const { authorize } = require('../auth/service')
const { verifyAccess } = require('../controllers/permissions')
const { find: findGuest } = require('../repositories/guests')

router.use(authorize(['admin', 'moderator']))

router.get('/access/:guest_id', async function (req, res) {
  verifyAccess(req.params.guest_id, res.locals.user.place_id)
    .then(async (access) => {
      let guest = await findGuest(req.params.guest_id)
      if (guest) {
        res.send({
          success: true,
          access: access,
          name: guest.name
        })
      } else {
        res.status(500).send({ success: false, error: 'Guest not found' })
      }
    })
    .catch((error) => {
      res.status(500).send({ success: false, error: error.message })
    })
})

module.exports = router
