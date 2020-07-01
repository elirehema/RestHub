const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TopicDataModel = new Schema({
    name: {
        type: String, required: true
    },
    Code: { type: String, required: true },
    subtopics: [{ type: Schema.Types.ObjectId, ref: sc.schema_topic }],
    resorces: [{ type: Schema.Types.ObjectId, ref: sc.schema_resources }],
    questions: [{ type: Schema.Types.ObjectId, ref: sc.schema_questions }],
    valid: { type: Boolean, default: true },
});

const TopicSchema = module.exports = mongoose.model(sc.schema_topic, TopicDataModel);


module.exports.get = function (callback, limit) {
    TopicSchema.find(callback).limit(limit);
};