'use strict'
const db = require('../data-access/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id bigint PRIMARY KEY,
    name text NOT NULL,
    role text NOT NULL,
    hash text NOT NULL,
    salt text NOT NULL
  );
  `);

  await client.query(`
  CREATE INDEX users_id_index on users (id);
  `);

  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE users;
  `);

  await client.release(true);
  next()
}