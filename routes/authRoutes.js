const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', [
    body('username').isString().notEmpty(),
    body('password').isLength({ min:6 })
], register);

router.post('/login', [
    body('username').isString().notEmpty(),
    body('password').notEmpty()
], login)

router.get('/me', auth, getMe);

module.exports = router;