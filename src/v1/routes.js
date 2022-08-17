const express = require("express")
const {register} = require("./controller/auth-controller/auth-controller");
const routes = express.Router()

routes.post('/register', register)

module.exports = routes