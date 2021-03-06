require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function(){
    winston.handleExceptions(new winston.transports.File({filename: 'UnhandledExceptions.log'}));
    
    process.on('unhandledRejection', (ex) => {
    throw ex;
    });
    
    winston.add(winston.transports.File, { filename: 'log.log' });
    winston.add(winston.transports.MongoDB,{
        db:'mongodb://localhost/invoice',
        level:'info'
    });
}