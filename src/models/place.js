const sql = require('sql-template-strings');
const db = require('../data-access/db');

module.exports = {
  async create(capacity) {
    const {rows} = await db.query(sql`
    INSERT INTO places (capacity)
      VALUES (${capacity})
      RETURNING id, capacity;
    `);

    const [place] = rows;
    return place;
  },

  async findAll() {
    const {rows} = await db.query(sql`
    SELECT * FROM places;
    `);
    return rows;
  },

  async delete(id){
    const {rows} = await db.query(sql`
    DELETE FROM places WHERE id = ${id}
    RETURNING id;
    `);
    const [place] = rows;
    return place;
  }
};