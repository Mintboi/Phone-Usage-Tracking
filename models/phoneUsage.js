const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var phoneUsageSchemaful = new Schema({
    education: {
        type: Number,
        required: true
    },
    browsing: {
        type: Number,
        required: true
    },
    shopping: {
        type: Number,
        required: true
    },
    date: {
    type: Date,
    required: true
    }},
    {
    timestamps: false
});
var phones = mongoose.model('phones', phoneUsageSchemaful);

module.exports = phones;