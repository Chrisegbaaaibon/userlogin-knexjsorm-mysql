'use strict'
const {sanitizeUserInput} = require('../../../core/classes')
const {errorHandling} = require('../../../core/error-handler')
const jwt = require('jsonwebtoken')

async function createUserAccount(request, response, next){
    try{
        const userAttributes = {
            name: sanitizeUserInput(request.body.name),
            username: sanitizeUserInput(request.body.username),
            email: sanitizeUserInput(request.body.email),
            phoneNumber: `+234` + sanitizeUserInput(request.body.phoneNumber),
            password: sanitizeUserInput(request.body.password),
            walletId: sanitizeUserInput(Math.floor(Math.random()* 1000000000)),
        }
            
        if(!userAttributes.name) errorHandling(`400|Name is Required.|`)
        if(!userAttributes.username) errorHandling(`400|Username is Required!.|`)
        if(!userAttributes.email) errorHandling(`400|Email is Required!.|`)
        if(userAttributes.phoneNumber) errorHandling('400|Phone number is required.|')
        if(!userAttributes.password) errorHandling(`400|Please input a password!.|`)


    }
    catch(e){
        next(new Error(e.stack))
    }
}

module.exports = {
    createUserAccount
}