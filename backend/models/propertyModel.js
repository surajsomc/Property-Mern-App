const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Property', propertySchema);