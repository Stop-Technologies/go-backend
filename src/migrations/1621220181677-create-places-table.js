'use strict'
const db = require('../data-access/db')

module.exports.up = async function (next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS places (
    id serial PRIMARY KEY,
    name text NOT NULL
  )
  `)

  await client.query(`
  CREATE INDEX places_id_index ON places(id)
  `)

  client.release(true)
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE places
  `)

  client.release(true)
  next()
}