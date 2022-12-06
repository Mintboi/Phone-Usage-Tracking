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
    name: {
        type: String,
        required: true
    },
    },
    {
    timestamps: true
});
var phones = mongoose.model('phones', phoneUsageSchemaful);

module.exports = phones;