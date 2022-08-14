const express = require("express")
const {createUser} = require("./controller/on-boarding/on-boarding");
const routes = express.Router()

routes.post('/register', createUser)

module.exports = routes