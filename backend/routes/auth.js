const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'thisisnotenovaadmin$pratyushbirole';
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');

router.post('/newuser', [
    body('email', 'Enter a valid email.').isEmail(),
    body('name', 'Enter a valid name.').isLength({ min: 3 }),
    body('password', 'Password must be longer than 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
    let success =false;
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email id already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;

        res.json({success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred!!");
    }
});

router.post('/login', [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ error: "Oops, Please try to login with correct credentials!" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ success,error: "Oops, Please try to login with correct credentials!" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occurred!!");
    }
});

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId= req.user.id;
        const user = await User.findById(req.user.id).select("-password");
        res.send(user);
       
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
