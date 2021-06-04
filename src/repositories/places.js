const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async find (id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM places
      WHERE id = ${id}
      LIMIT 1
    `)
    const [place] = rows
    return place
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT *
      FROM places
    `)
    return rows
  },

  async create (name) {
    const {rows} = await db.query(sql`
      INSERT
      INTO places (name)
      VALUES (${name})
      RETURNING *
    `)
    const [place] = rows
    return place
  },

  async update (id, name) {
    const {rows} = await db.query(sql`
      UPDATE places
      SET name = ${name}
      WHERE id = ${id}
      RETURNING *
    `)
    const [place] = rows
    return place
  },

  async delete (id) {
    const {rows} = await db.query(sql`
      DELETE
      FROM places
      WHERE id = ${id}
      RETURNING *
    `)
    const[place] = rows
    return place
  },
}
