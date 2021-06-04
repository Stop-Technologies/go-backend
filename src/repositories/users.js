const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async find (id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM users INNER JOIN people ON users.person_id = people.id
      WHERE person_id = ${id}
      LIMIT 1
    `)
    const [user] = rows
    return user
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT id, name, role, place_id
      FROM users INNER JOIN people ON users.person_id = people.id
    `)
    return rows
  },

  async create (id, name, role, hash, salt, placeId) {
    await db.query(sql`
      BEGIN TRANSACTION
    `)
    await db.query(sql`
      INSERT
      INTO people (id, name)
      VALUES (${id}, ${name})
    `)
    await db.query(sql`
      INSERT
      INTO users (person_id, role, hash, salt, place_id)
      VALUES (${id}, ${role}, ${hash}, ${salt}, ${placeId})
    `)
    await db.query(sql`
      END TRANSACTION
    `)
    return await this.find(id)
  },

  async update (id, name, placeId) {
    await db.query(sql`
      BEGIN TRANSACTION
    `)
    await db.query(sql`
      UPDATE people
      SET name = ${name}
      WHERE id = ${id}
    `)
    await db.query(sql`
      UPDATE users
      SET place_id = ${placeId}
      WHERE person_id = ${id}
    `)
    await db.query(sql`
      END TRANSACTION
    `)
    return await this.find(id)
  },

  async updateName (id, name) {
    await db.query(sql`
      UPDATE people
      SET name = ${name}
      WHERE id = ${id}
      RETURNING *
    `)
    return await this.find(id)
  },

  async updatePassword (id, hash, salt) {
    await db.query(sql`
      UPDATE users
      SET hash = ${hash}, salt = ${salt}
      WHERE person_id = ${id}
      RETURNING *
    `)
    return await this.find(id)
  },

  async delete (id){
    const user = await this.find(id)
    await db.query(sql`
      BEGIN TRANSACTION
    `)
    await db.query(sql`
      DELETE
      FROM users
      WHERE person_id = ${id}
    `)
    await db.query(sql`
      DELETE
      FROM people
      WHERE id = ${id}
    `)
    await db.query(sql`
      END TRANSACTION
    `)
    return user
  },
}
