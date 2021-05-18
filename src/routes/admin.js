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

module.exports = router
