const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const users = [];
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