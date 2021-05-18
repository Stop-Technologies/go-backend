const sql = require('sql-template-strings')
const db = require('../data-access/db')
const { generateSecurityCredentials } = require('../util/security')

module.exports = {
  async update (id, name, role, placeId) {
    const {rows} = await db.query(sql`
      INSERT
      INTO users (name, role, place_id)
      VALUES (${name}, ${role}, ${placeId})
      WHERE person_id = ${id}
      RETURNING person_id
    `)
    const [user] = rows
    return user
  },

  async create (id, name, role, password, placeId) {
    const {hash, salt} = generateSecurityCredentials(password, 100)
    const {rows} = await db.query(sql`
      INSERT
      INTO users (person_id, name, role, hash, salt, place_id)
      VALUES (${id}, ${name}, ${role}, ${hash}, ${salt}, ${placeId})
      RETURNING person_id
    `)
    const [user] = rows
    return user
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT person_id, name, role, place_id
      FROM users
    `)
    return rows
  },

  async find (id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM users
      WHERE person_id = ${id}
      LIMIT 1
    `)
    const [user] = rows
    return user
  }
}
