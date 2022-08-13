'use strict'

const { createCache, cacheExists, getCacheData, deleteCache } = require('./cache')
const {errorHandling} = require('./error-handler')
const {sanitizeUserInput, uid} = require('./classes')
const moment = require('moment')

async function authentication(request, response, next){
    try{
        if(!request.headers.authorization) errorHandling(`400|Header Authorization is Required!.|`)
        const basicAuthorization = sanitizeUserInput(request.headers.authorization)
        if(!basicAuthorization.includes('Basic')) errorHandling(`400|Only basic Authorization is Supported.|`)
        const [username, password] = Buffer.from(basicAuthorization.split('Basic')[1], 'base64').toString('ascii').split(':')

        // Search Database to get User Data

        // Process Data

        // Delete Existing Tokens by user id from data
        // deleteExistingTokens(user_id)

        // Get User IpAddress
        const ipAddress = (request.headers['x-forwarded-for'] || request.connection.remoteAddress || '').split(',')[0].trim()
        
        // So we are using uids as our tokens, but you can use the token to verify if the user email exists

        const authenticationToken = uid()
        // Save UserDetails Into Cache
        createCache(user_id) // Data From Query

        if(!cacheExists(user_id)) await getUserAccessDetails()
        
    }
    catch(e){
        next(new Error(e.stack))
    }
}

async function deleteExistingTokens(user_id){
    // Run Some Sql Queries Here - Delete
}

async function getUserAccessDetails(user_id){
    // RUn Some Sql Queries - SELECT *
    // Then Create Cache

    createCache(user_id)// Data from Query
}



module.exports = {
    authentication
}