const express = require('express')
const User = express.Router();

const {loginUser, signupUser} = require('../controllers/userController')

// login
User.post('/login', loginUser)


// signup
User.post('/signup', signupUser)

module.exports = User
