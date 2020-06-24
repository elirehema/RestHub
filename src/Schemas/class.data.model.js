const sc = require('../plugins/schemas');
const mongoose = require('mongoose');
var ClassesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var Classes = module.exports = mongoose.model('Classes', ClassesSchema);

module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
};