const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async update (id, name) {
    const {rows} = await db.query(sql`
      INSERT
      INTO people (name)
      VALUES (${name})
      WHERE id = ${id}
      RETURNING id
    `)
    const [user] = rows
    return user
  },

  async create (id, name) {
    const {rows} = await db.query(sql`
      INSERT
      INTO people (id, name)
      VALUES (${id}, ${name})
      RETURNING id
    `)
    const [user] = rows
    return user
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT *
      FROM people
    `)
    return rows
  },

  async delete (id){
    const {rows} = await db.query(sql`
      DELETE
      FROM people
      WHERE id = ${id}
      RETURNING id
    `)
    const[user] = rows
    return user
  },

  async find (id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM people
      WHERE id = ${id}
      LIMIT 1
    `)
    const [person] = rows
    return person
  }
}
