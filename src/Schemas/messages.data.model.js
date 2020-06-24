const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    upvotes: [{ type: ObjectId, ref: sc.schema_users }],
    downvotes: [{ type: ObjectId, ref: sc.schema_users }]
});

var Message = module.exports = mongoose.model(sc.schema_message, messageSchema);
module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
};
