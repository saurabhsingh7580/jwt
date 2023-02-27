const express = require('express')

const jwtRoutes = express.Router()

const { userRegister, userLogin } = require('../controllers/jwt')

jwtRoutes.post('/register', userRegister)
jwtRoutes.post('/login', userLogin)

module.exports = { jwtRoutes}