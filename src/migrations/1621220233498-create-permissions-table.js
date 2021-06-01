'use strict'
const db = require('../data-access/db')

module.exports.up = async function (next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS permissions (
    id serial PRIMARY KEY,
    place_id integer,
    guest_id bigint,
    time_range tsrange NOT NULL,
    CONSTRAINT fk_place
      FOREIGN KEY(place_id)
        REFERENCES places(id)
          ON DELETE CASCADE,
    CONSTRAINT fk_guest
      FOREIGN KEY(guest_id)
        REFERENCES guests(person_id)
          ON DELETE CASCADE
  )
  `)

  await client.query(`
  CREATE INDEX permissions_id_index ON permissions(id)
  `)

  client.release(true)
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE permissions
  `)

  client.release(true)
  next()
}