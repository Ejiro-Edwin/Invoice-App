const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User Already Registered');

    user = new User(_.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'company_name']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // const token = jwt.sign({ _id : user._id},config.get('JwtPrivateKey'));
    const token = user.generateUserAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstname', 'lastname', 'email','company_name']));


});

module.exports = router;