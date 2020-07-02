var mongoose = require('mongoose');
const sc = require('../plugins/schemas');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
    question: { type: String, required: true },
    description: { type: String, required: true },
    valid: { type: Boolean, default: true },
    author: { type: ObjectId, ref: sc.schema_users },
    upvotes: [{ type: ObjectId, ref: sc.schema_users }],
    downvotes: [{ type: ObjectId, ref: sc.schema_users }],
    answers: [{ type: ObjectId, ref: sc.schema_answers }],
    replies: [{ type: ObjectId, ref: sc.schema_replies }],
    updated: { type: Date, default: Date.now, required: true }

}, { emitIndexErrors: true, autoCreate: true, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const _question_schema = mongoose.model(sc.schema_questions, schema);


module.exports = _question_schema;