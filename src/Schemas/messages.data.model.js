const sc = require('../plugins/schemas');
var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

var Message = module.exports = mongoose.model(sc.schema_message, messageSchema);
module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
};
