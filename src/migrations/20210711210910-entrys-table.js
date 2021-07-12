'use strict'
const db = require('../data-access/db')

module.exports.up = async function (next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS entries (
    id serial PRIMARY KEY,
    guest_id bigint NOT NULL,
    place_id integer NOT NULL,
    time timestamp DEFAULT NOW(),
    CONSTRAINT fk_person
    FOREIGN KEY(guest_id)
      REFERENCES guests(person_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_place
    FOREIGN KEY(place_id)
      REFERENCES places(id)
        ON DELETE CASCADE
  )
  `)

  await client.query(`
  CREATE INDEX entries_id_index ON entries(id)
  `)

  client.release(true)
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE entries
  `)

  client.release(true)
  next()
}
