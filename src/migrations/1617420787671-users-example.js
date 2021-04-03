'use strict'
const db = require('../data-access/db');
// This is only an example transaction

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    email text UNIQUE,
    password text
  );
  `);

  await client.query(`
  CREATE INDEX users_email on users (email);
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
