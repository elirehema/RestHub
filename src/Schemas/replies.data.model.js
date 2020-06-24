const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var RepliesDataModel = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    message: {
        type: String,
        required: true,
    },
    questionId: { type: ObjectId, ref: sc.schema_questions },
    upvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }]
});

const RepliesSchema = module.exports = mongoose.model(sc.schema_replies, RepliesDataModel);


module.exports.get = function (callback, limit) {
    RepliesSchema.find(callback).limit(limit);
};