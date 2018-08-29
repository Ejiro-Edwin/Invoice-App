const auth = require('../middleware/auth');
const { Invoice, validate } = require('../models/invoice');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const invoice = await Invoice.find().sort('title');
    res.send(invoice);

});

router.get('/:id', async (req, res) => {
    const invoice = await Invoice.findById(req.params.id)
    if (!invoice) return res.status(404).send('The invoice with the given ID was not found');
    res.send(invoice);
});

router.post('/',auth,async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send('Invalid User');

    const invoice = new Invoice({
        title: req.body.title,
        user: {
            _id: user._id,
            email: user.email
        },
        status: req.body.status
    });
  await invoice.save();
    res.send(invoice);
});

router.put('/:id',auth, async (req, res) => {
    const result = validate(req.body); //validate
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send('Invalid User');

    const invoice = await Invoice.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            user: {
                _id: user._id,
                email: user.email
            },
            status: req.body.status
        }, { new: true });

    if (!invoice) return res.status(404).send('The invoice with the given ID was not found');

    res.send(movie);
});


router.delete('/:id',auth, async (req, res) => {
    const invoice = await Invoice.findByIdAndRemove(req.params.id);
    if (!invoice) return res.status(404).send('The invoice with the given ID was not found');

    res.send(invoice);
});

module.exports = router;