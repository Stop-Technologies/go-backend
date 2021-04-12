'use strict'
const db = require('../data-access/db');
// This is only an example transaction

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id bigint PRIMARY KEY,
    name char(45) NOT NULL,
    role char(45) NOT NULL,
    password char(45) NOT NULL
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