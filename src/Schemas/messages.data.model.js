const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
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
},{ emitIndexErrors: true, autoCreate: true,  timestamps: { createdAt: 'created_at',updatedAt:'updated_at' }});

var message_schema = mongoose.model(sc.schema_message, schema);
module.exports = message_schema;
