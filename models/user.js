const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config =require('config');

const userSchema = new mongoose.Schema({
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
    }
});
userSchema.methods.generateUserAuthToken = function()  {
    const token = jwt.sign({ _id : this._id},config.get('JwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        firstname: Joi.string().min(5).max(50).required(),   //validate
        lastname: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);

}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validate = validateUser;