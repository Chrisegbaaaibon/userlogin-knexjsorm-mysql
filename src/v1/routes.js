const express = require("express")
const {createUser} = require("./controller/auth-controller/auth-controller");
const routes = express.Router()

routes.post('/register', createUser)

module.exports = routes