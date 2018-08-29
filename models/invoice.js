const Joi = require('joi');
const mongoose = require('mongoose');
const { userSchema } = require('./user');

const invoiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    user: {
        type: userSchema,
        required: true
    },
    status: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    }
});
const Invoice = mongoose.model('Invoice', invoiceSchema);

function validateInvoice(invoice) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),   //validate
        userId: Joi.objectId().required(),
        status: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(invoice, schema);

}

module.exports.invoiceSchema = invoiceSchema;
module.exports.Invoice = Invoice;
module.exports.validate = validateInvoice;