'use strict'
const {sanitizeUserInput} = require('../../../core/classes')
const {errorHandling} = require('../../../core/error-handler')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../../../core/models');

const register = async (req, res, next)=>{
    const props = req.body.user;
    const oldUser = await User.findOne({username: props.username, email: props.email })
    if(oldUser) errorHandling(`400|User already exists|`)
    const token = jwt.sign(props.email, process.env.KEY, {
        expiresIn: '2h'
    })
    User.create(props);
    return {
        token
    }
}

module.exports = {
    register
}