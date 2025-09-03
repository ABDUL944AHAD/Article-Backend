const express = require('express')
const {Signup , Login} = require('../controller/authController');
const router = express.Router();

// Post /auth/signup 
router.post('/signup' , Signup);

// Post /auth/login
router.post('/login' , Login)

module.exports = router;

