'use strict'
const db = require('../data-access/db');
// This is only an example transaction

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS access (
    id serial PRIMARY KEY,
    id_place integer,
    id_user bigint,
    CONSTRAINT fk_place
      FOREIGN KEY(id_place)
        REFERENCES places(id)
          ON DELETE CASCADE,
    CONSTRAINT fk_user
      FOREIGN KEY(id_user)
        REFERENCES users(id)
          ON DELETE CASCADE
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