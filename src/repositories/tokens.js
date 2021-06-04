const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async updateOrCreate (userId, accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt) {
    const {rows} = await db.query(sql`
      INSERT
        INTO access_tokens (
          user_id,
          access_token,
          access_token_expires_at,
          refresh_token,
          refresh_token_expires_at
        )
        VALUES (
          ${userId},
          ${accessToken},
          ${accessTokenExpiresAt},
          ${refreshToken},
          ${refreshTokenExpiresAt}
        )
      ON CONFLICT (access_token) DO UPDATE
        SET
          user_id = EXCLUDED.user_id,
          access_token = EXCLUDED.access_token,
          access_token_expires_at = EXCLUDED.access_token_expires_at,
          refresh_token = EXCLUDED.refresh_token,
          refresh_token_expires_at = EXCLUDED.refresh_token_expires_at
      RETURNING *
    `)
    const [token] = rows
    return token
  },

  async findByAccessToken (accessToken) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM access_tokens
      WHERE access_token = ${accessToken}
      LIMIT 1
    `)
    const [token] = rows
    return token
  },

  async findByRefreshToken (refreshToken) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM access_tokens
      WHERE refresh_token = ${refreshToken}
      LIMIT 1
    `)
    const [token] = rows
    return token
  },

  async delete (accessToken) {
    const {rows} = await db.query(sql`
      DELETE
      FROM access_tokens
      WHERE access_token = ${accessToken}
      RETURNING access_token
    `)
    const[token] = rows
    return token
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT *
      FROM access_tokens
    `)
    const[token] = rows
    return token
  }
}
