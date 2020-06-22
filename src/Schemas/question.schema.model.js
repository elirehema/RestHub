var mongoose = require('mongoose');
const sc = require('../plugins/schemas');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var QuestionsSchemas = new Schema({
    question: {
        type: String,
        required: true
    },
    questionValidity: {
        type: Boolean,
        default: true
    },
    questionDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    questionAuthor: {
        type: Schema.Types.ObjectId,
        ref: sc.schema_users
    },
    questionVotes: Number,
    questionAnswers: [{
        type: Schema.Types.ObjectId,
        ref: sc.schema_answers,

    }],
    questionReplies: [{
        type: ObjectId,
        ref: sc.schema_replies
    }],
    questionLastUpdated: {
        type: Date
    }


});

const QuestionsSchema = module.exports = mongoose.model(sc.schema_questions, QuestionsSchemas);


module.exports.get = function (callback, limit) {
    QuestionsSchema.find(callback).limit(limit);
};