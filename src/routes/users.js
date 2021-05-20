// TODO
// get put
// recibe el token (id),
// si el id no coincide con el body del put, no se actualiza.
const Router = require('express')
const router = Router()
const user = require("../controllers/user")
module.exports = router

router.get('/users', function(req, res, next){
    user.find()
    .then((users) => {
      res.send({ users: users, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.get('/users/:id', function(req, res, next){
    user.find(req.params.id)
    .then((users) => {
      res.send({ users: users, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.put('/users/:id', function(req, res, next){
    user.update(req.params.id, req.body)
    .then((users) => {
      res.send({ users: users, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})

router.post('/users/', function(req, res, next){
    user.create(req.body.id, req.body.name,
        req.body.password, req.body.placeId)
    .then((users) => {
      res.send({ users: users, success: true });
    })
    .catch(((error) => {
      res.status(500).send({ error: error, success: false });
    }))
})