const express = require('express'),
    cors = require('cors'),
    PORT = process.env.PORT || 8181

require('dotenv').config()
const routes = require(`../src/${process.env.VERSION}/routes`);
const {errorProcessing} = require(`../src/core/error-handler`)
const bootstrap = require('./bootstrap')

const app = express()
const { db } = require(`../src/core/db`)
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`../src/${process.env.VERSION}/public`))



bootstrap(`${process.env.VERSION}`, app, routes);

app.use((request, response, next) => {
    next({
        errorCode : 404,
        errorMessage: {
            message: 'Invalid Endpoint.'
        }
    })
})

app.use((error, request, response, next) => {
    if(error instanceof Error) error = errorProcessing(error)
    const statusCode = (error.errorCode) ? error.errorCode : 500
    const statusMessage = (error.errorMessage) ? error.errorMessage : {error : {message: 'Internal Server Error.'}}
    response.status(statusCode).json(statusMessage)
})

app.listen(PORT, db, () => {
    console.log(`App Started, Port : ${PORT}`)
})