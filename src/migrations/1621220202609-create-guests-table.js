'use strict'
const db = require('../data-access/db')

module.exports.up = async function (next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS guests (
    person_id bigint PRIMARY KEY,
    CONSTRAINT fk_person
      FOREIGN KEY(person_id)
        REFERENCES people(id)
          ON DELETE CASCADE
  )
  `)

  await client.query(`
  CREATE INDEX guests_id_index ON guests(person_id)
  `)

  client.release(true)
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE guests
  `)

  client.release(true)
  next()
}