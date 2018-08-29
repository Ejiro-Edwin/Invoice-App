const Joi = require('joi');
const mongoose = require('mongoose');

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    user: { 
      type: new mongoose.Schema({
        firstname: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        lastname: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique:true,
            minlength: 5,
            maxlength: 255
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
        company_name:{
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique:true
        }  
      }),  
      required: true
    },
    invoice: {
      type: new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        status: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        }
      }),
      required: true
    },
    Txn_date: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    amount: { 
      type: Number, 
      min: 0
    }
  }));


function validateTransact(transacts) {
    const schema = {
        amount: Joi.number().min(0).required(),
        invoiceId: Joi.objectId().required(),
        userId: Joi.objectId().required()
    };

    return Joi.validate(transacts, schema);

}

module.exports.Transaction = Transaction;
module.exports.validate = validateTransact;