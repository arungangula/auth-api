const express = require('express');
const { body } = require('express-validator');
const { register } = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
    body('username').isString().notEmpty(),
    body('password').isLength({ min:6 })
], register);


module.exports = router;