const sql = require('sql-template-strings');
const db = require('../data-access/db');

module.exports = {
  async create(id_place, id_user) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO access (id_place, id_user)
        VALUES (${id_place}, ${id_user})
        RETURNING id, id_place, id_user;
      `);

      const [access] = rows;
      return access;
    } catch (error) {
      if (error.constraint === 'access_id_key') {
        return null;
      }

      throw error;
    }
  },

  async findAll() {
    const {rows} = await db.query(sql`
    SELECT * FROM access;
    `);
    return rows;
  },

  async delete(id){
    try{
      const {rows} = await db.query(sql`
      DELETE FROM access WHERE id = ${id}
      RETURNING id;
      `);
      const[access] = row;
      return access;
    }catch(error){
      throw error;
    }
  }
};