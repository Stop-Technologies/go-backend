'use strict'
const db = require('../data-access/db');
// This is only an example transaction

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS access (
    id serial PRIMARY KEY,
    id_place integer REFERENCES places (id),
    id_user bigint REFERENCES users (id)
  );
  `);

  await client.query(`
  CREATE INDEX access_id_index on access (id);
  `);

  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE access;
  `);

  await client.release(true);
  next()
}