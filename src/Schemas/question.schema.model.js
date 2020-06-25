var mongoose = require('mongoose');
const sc = require('../plugins/schemas');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var QuestionsSchemas = new Schema({
    question: { type: String, required: true },
    description: { type: String, required: true },
    valid: { type: Boolean, default: true },
    date: { type: Date, required: true, default: Date.now },
    author: { type: ObjectId, ref: sc.schema_users },
    upvotes: [{ type: ObjectId, ref: sc.schema_users }],
    downvotes: [{ type: ObjectId, ref: sc.schema_users }],
    answers: [{ type: ObjectId, ref: sc.schema_answers }],
    replies: [{ type: ObjectId, ref: sc.schema_replies }],
    updated: { type: Date, default: Date.now, required: true }

});

const QuestionsSchema = module.exports = mongoose.model(sc.schema_questions, QuestionsSchemas);


module.exports.get = function (callback, limit) {
    QuestionsSchema.find(callback).limit(limit);
};