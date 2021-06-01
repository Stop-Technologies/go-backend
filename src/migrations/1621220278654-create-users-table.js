'use strict'
const db = require('../data-access/db')

module.exports.up = async function (next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    person_id bigint PRIMARY KEY,
    hash text NOT NULL,
    salt text NOT NULL,
    role text NOT NULL,
    place_id integer,
    CONSTRAINT fk_person
    FOREIGN KEY(person_id)
      REFERENCES people(id)
        ON DELETE CASCADE
  )
  `)

  await client.query(`
  CREATE INDEX users_id_index ON users(person_id)
  `)

  client.release(true)
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE users
  `)

  client.release(true)
  next()
}
