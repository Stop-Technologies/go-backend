'use strict';
const db = require('../data-access/db');
module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS permissions (
    id serial PRIMARY KEY,
    user_id bigint NOT NULL,
    time_start timestamp NOT NULL,
    time_end timestamp NOT NULL,
    CONSTRAINT fk_user_id
      FOREIGN KEY(user_id)
        REFERENCES users(id)
          ON DELETE CASCADE
  );
  `);

  await client.query(`
  CREATE INDEX permissions_id_index on places (id);
  `);

  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE permissions;
  `);

  await client.release(true);
  next()
}