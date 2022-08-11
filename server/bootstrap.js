'use strict'
require('dotenv').config()
module.exports = (version, router, routes) => {
    router.use(`/${version}`, routes)
    router.get('/', (request, response) => {
        response.status(200).json({ statusCode: 200, statusMessage: "OK", Version: `${version}` })
    })

}