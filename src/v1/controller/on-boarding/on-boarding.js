'use strict'
const {sanitizeUserInput} = require('../../../core/classes')
const {errorHandling} = require('../../../core/error-handler')
const bcrypt = require('bcrypt')
require('dotenv').config()
const UserDao = require('../../../core/dao/user')
const jwt = require('jsonwebtoken')
const db = require('../../../core/db')

async function createUser (request, response, next) {
    if(!request.body) errorHandling(`400|Missing fields.|`)
    const hash = bcrypt.hashSync(request.body.password, 10)
    db('user').insert({
        name: request.body.name,
        username: request.body.username,
        password: hash,
        phonenumber: request.body.phonenumber,
        email: request.body.email
    });

    //console.log(request.body.name, request.body.email, request.body.username, request.body.phonenumber, request.body.password)
     return jwt.sign('hello', process.env.KEY, {
        expiresIn: '2 days'
    })
}

module.exports = {
    createUser
}