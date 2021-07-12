const Router = require('express')
const router = Router()
const { authorize } = require('../auth/service')
const { verifyAccess } = require('../controllers/permissions')
const { find: findGuest } = require('../repositories/guests')
const { create: createEntry, isGuestAlready } = require('../controllers/entries')
router.use(authorize(['admin', 'moderator']))
router.get('/access/:guest_id', async function (req, res) {
  place_id = res.locals.user.place_id
  guest_id = req.params.guest_id
  verifyAccess(guest_id, place_id)
    .then(async (access) => {
      isGuestInside = await isGuestAlready(place_id, guest_id);
      if (access && !isGuestInside) createEntry(guest_id, place_id);
      let guest = await findGuest(guest_id)
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
