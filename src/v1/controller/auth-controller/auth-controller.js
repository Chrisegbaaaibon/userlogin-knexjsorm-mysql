'use strict'
const {sanitizeUserInput} = require('../../../core/classes')
const {errorHandling} = require('../../../core/error-handler')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../../../core/models');

const register = async (req, res, next)=>{
    const props = req.body.user;
    User.findOne({username: props.username, email: props.email })

}

module.exports = {
    createUser
}