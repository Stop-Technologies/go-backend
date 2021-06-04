'use strict'
const db = require('../data-access/db')

module.exports.up = async function (next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS access_tokens (
    user_id bigint PRIMARY KEY,
    access_token text UNIQUE NOT NULL,
    access_token_expires_at timestamp without time zone NOT NULL,
    refresh_token text UNIQUE NOT NULL,
    refresh_token_expires_at timestamp without time zone NOT NULL,
    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(person_id)
        ON DELETE CASCADE
  )
  `)

  await client.query(`
  CREATE INDEX access_tokens_id_index ON access_tokens(access_token)
  `)

  await client.query(`
  CREATE INDEX refresh_tokens_id_index ON access_tokens(refresh_token)
  `)

  client.release(true)
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE access_tokens
  `)

  client.release(true)
  next()
}
