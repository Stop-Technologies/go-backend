const sql = require('sql-template-strings');
const db = require('../data-access/db');

module.exports = {
  async create(access_capacity) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO places (access_capacity)
        VALUES (${access_capacity})
        RETURNING id, access_capacity;
      `);

      const [place] = rows;
      return place;
    } catch (error) {
      if (error.constraint === 'places_id_key') {
        return null;
      }

      throw error;
    }
  },

  async findAll() {
    const {rows} = await db.query(sql`
    SELECT * FROM places;
    `);
    return rows;
  },

  async delete(id){
    try{
      const {rows} = await db.query(sql`
      DELETE FROM places WHERE id = ${id}
      RETURNING id;
      `);
     const [place] = rows;
     return place;
    }catch(error){
      throw error;
    }
    
  }
};