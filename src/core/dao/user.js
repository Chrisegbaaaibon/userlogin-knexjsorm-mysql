const db = require('../db');


class UserDAO {
    async createUser(name, username, email, password, phoneNumber) {
        const [id] = await db('user').insert({
            email,
            name: name,
            username: username,
            phoneNumber: phoneNumber,
            password: password
        }).returning('id');
        return id;
    }
    async getAll() {
        return  db('user').select('*')
    }
    async getById(id) {
        return  db('user').where('id', id)
    }
    async updateUserById(id, name, username, email, password, phoneNumber) {
        return   db('person').where('id', id).update({
            email: email,
            name: name,
            username: username,
            password: password,
            phoneNumber: phoneNumber
        })

    }
    async deleteUserById(id) {
        return  db('person').where('id', id).del()
    }
}
module.exports = new UserDAO();