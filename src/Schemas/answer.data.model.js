const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var AnswersSchemas = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    message: {
        type: String,
        required: true,
    },
    questionId: { type: Schema.Types.ObjectId, ref: sc.schema_questions },
    votes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: sc.schema_comments
    }]

});

const AnswersSchema = module.exports = mongoose.model(sc.schema_answers, AnswersSchemas);


module.exports.get = function (callback, limit) {
    AnswersSchema.find(callback).limit(limit);
};