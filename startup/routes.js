// const genres = require('../routes/genres');
// const customers = require('../routes/customers');
// const movies = require('../routes/movies');
// const rentals = require('../routes/rentals');
// const users = require('../routes/users');
const auths = require('../routes/auth');
const invoice = require('../routes/invoices');
const users = require('../routes/users');
const transactions = require('../routes/transactions');
const home = require('../routes/home');
const error = require('../middleware/error');
const express = require('express');
var helmet = require('helmet');

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(helmet());
    app.use('/api/invoice', invoice);
    app.use('/api/users', users);
    app.use('/api/transactions', transactions);
    // app.use('/api/rentals', rentals);
    // app.use('/api/users', users);
    app.use('/api/auth', auths);
    app.use('/', home);

    app.use(error);
}