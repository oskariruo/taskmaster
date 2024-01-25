const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('./authenticateToken')

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User regirstered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'});
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials ' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json( { error: 'Invalid credentials '});
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.json({ token });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

router.post('/verify', authenticateToken, (req, res) => {
    res.json({ message: 'Token verified', userId: req.user.userId });
});

module.exports = router;