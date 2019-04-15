const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 40
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const customerModel = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(3).max(40).required(),
        phone: Joi.string().min(9).max(40).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
};

module.exports = { 
    Customer: customerModel, 
    Validate: validateCustomer 
};