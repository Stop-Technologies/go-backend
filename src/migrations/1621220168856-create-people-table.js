'use strict'
const db = require('../data-access/db')

module.exports.up = async function (next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS people (
    id bigint PRIMARY KEY,
    name text NOT NULL
  )
  `)

  await client.query(`
  CREATE INDEX people_id_index ON people(id)
  `)

  client.release(true)
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE people
  `)

  client.release(true)
  next()
}
