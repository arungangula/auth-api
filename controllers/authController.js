const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const users = [];
const JWT_SECRET = process.env.JWT_SECRET;
exports.register = async(req, res) => {
    const errors = validationResult(req).formatWith(({msg, path}) => {
        return {msg, path};
    });

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const userExists = users.find(u => u.username == username);

    if (userExists) {
        return res.status(400).json({message: 'Username already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        id: users.length + 1,
        username,
        password: hashedPassword
    };
    users.push(user);
    res.status(201).json({ message: `User ${username} registered successfully` });
};

exports.login = async(req, res) => {
    const errors = validationResult(req).formatWith(({msg, path}) => {
        return {msg, path};
    });

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = users.find(u => u.username == username);

    if (!user) {
        return res.status(400).json({messsage: 'Invalid credentials'});
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username,
    }, JWT_SECRET, {
        expiresIn: '2h'
    });

    res.json({token});
};

exports.getMe = (req, res) => {
    res.json({
        user: req.user
    });
}