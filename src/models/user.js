const sql = require('sql-template-strings');
const db = require('../data-access/db');
const guard = require('../util/security-helper');

module.exports = {
  async create(id, name, role, password) {
    console.log("in");
    const {hash, salt} = guard.generateSecurityCredentials(password, 100);
    console.log("out");
    console.log(hash);
    console.log(salt);
    const {rows} = await db.query(sql`
    INSERT INTO users (id, name, role, hash, salt)
      VALUES (${id}, ${name}, ${role}, ${hash}, ${salt})
      RETURNING id;
    `);

    const [user] = rows;
    return user;
  },

  async findAll() {
    const {rows} = await db.query(sql`
    SELECT id, name, role FROM users;
    `);
    return rows;
  },

  async delete(id){
    const {rows} = await db.query(sql`
    DELETE FROM users WHERE id = ${id}
    RETURNING id;
    `);
    const[user] = rows;
    return user;
  },

  async find(id) {
    const {rows} = await db.query(sql`
    SELECT * FROM users WHERE id = ${id} LIMIT 1;
    `);
    const [user] = rows;
    return user;
  }
};