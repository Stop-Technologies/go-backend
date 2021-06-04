const Router = require('express')
const router = Router()
const sql = require('sql-template-strings')
const db = require('../data-access/db')
const { generateSecurityCredentials } = require('../util/security')
const { findAll } = require('../repositories/tokens')

/* GET root route. */
router.get('/', function(req, res) {
  res.send('Welcome to the go backend server')
})

router.get('/tokens', function(req, res) {
  findAll()
    .then((tokens) => {
      res.send(tokens)
    })
    .catch((error) => {
      res.status(500)
        .send({
          success: false,
          error: error.message
        })
    })
})

router.get('/seed', async function(req, res) {
  await db.query(sql`
    INSERT INTO places (name)
    VALUES (${'place'})
  `)
  await db.query(sql`
    INSERT INTO people (id, name)
    VALUES (${1}, ${'admin'})
  `)
  var cred = generateSecurityCredentials('password', 100)
  await db.query(sql`
    INSERT INTO users (person_id, hash, salt, role, place_id)
    VALUES (${1}, ${cred.hash}, ${cred.salt}, ${'admin'}, ${1})
  `)
  await db.query(sql`
    INSERT INTO people (id, name)
    VALUES (${2}, ${'moderator'})
  `)
  cred = generateSecurityCredentials('password', 100)
  await db.query(sql`
    INSERT INTO users (person_id, hash, salt, role, place_id)
    VALUES (${2}, ${cred.hash}, ${cred.salt}, ${'moderator'}, ${1})
  `)
  await db.query(sql`
    INSERT INTO people (id, name)
    VALUES (${3}, ${'guest'})
  `)
  await db.query(sql`
    INSERT INTO guests (person_id)
    VALUES (${3})
  `)
  await db.query(sql`
    INSERT INTO permissions (guest_id, place_id, time_range)
    VALUES (${3}, ${1}, ${'[1996-01-01 00:00:00, 1996-01-01 23:59:59)'})
  `)
  await db.query(sql`
    INSERT INTO permissions (guest_id, place_id, time_range)
    VALUES (${3}, ${1}, ${'[1996-01-02 00:00:00, 1996-01-02 23:59:59)'})
  `)
  await db.query(sql`
    INSERT INTO permissions (guest_id, place_id, time_range)
    VALUES (${3}, ${1}, ${'[1996-01-03 00:00:00, 1996-01-03 23:59:59)'})
  `)
  await db.query(sql`
    INSERT INTO permissions (guest_id, place_id, time_range)
    VALUES (${3}, ${1}, ${'[1996-01-04 00:00:00, 1996-01-04 23:59:59)'})
  `)
  await db.query(sql`
    INSERT INTO permissions (guest_id, place_id, time_range)
    VALUES (${3}, ${1}, ${'[1996-01-05 00:00:00, 1996-01-05 23:59:59)'})
  `)
  res.send('Seed completed')
})

module.exports = router
