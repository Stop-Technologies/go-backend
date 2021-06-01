const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async update (id, name) {
    const {rows} = await db.query(sql`
      INSERT
      INTO places (name)
      VALUES (${name})
      WHERE id = ${id}
      RETURNING id;
    `)
    const [user] = rows
    return user
  },

  async create (id, name) {
    const {rows} = await db.query(sql`
      INSERT
      INTO places (id, name)
      VALUES (${id}, ${name})
      RETURNING id;
    `)
    const [user] = rows
    return user
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT *
      FROM places;
    `)
    return rows
  },

  async delete (id){
    const {rows} = await db.query(sql`
      DELETE
      FROM places
      WHERE id = ${id}
      RETURNING id;
    `)
    const[user] = rows
    return user
  },

  async find (id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM places
      WHERE id = ${id}
      LIMIT 1;
    `)
    const [person] = rows
    return person
  },

  async update (id, newId) {
    const { rows } = await db.query(sql`
      UPDATE places
      SET id = ${newId}
      WHERE id = ${id};
    `)
    const [person] = rows
    return person
  }
}
