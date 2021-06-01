const { get } = require("../routes/auth")
const users = require("../repositories/users")

module.exports = {

    find() {
        let users = await users.findAll()
        return users;
    },

    find(id) {
        let user = await users.find(id)
        return user;
    },

    update(id, body) {
        continue;
    },

    create(id, name, role, password, placeId) {
        if (role != "admin") {
            let user = await users.create(id, name, role, password, placeId);
            return user;
        }
        throw new Error("The new user can't be an admin");
    }
}