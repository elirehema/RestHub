const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
    name: {
        type: String, required: true, unique: true
    },
    Code: { type: String, required: true, unique: true },
    subtopics: [{ type: Schema.Types.ObjectId, ref: sc.schema_topic }],
    resorces: [{ type: Schema.Types.ObjectId, ref: sc.schema_resources }],
    questions: [{ type: Schema.Types.ObjectId, ref: sc.schema_questions }],
    valid: { type: Boolean, default: true },
}, { emitIndexErrors: true, autoCreate: true, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const _model = mongoose.model(sc.schema_topic, schema);


module.exports = _model;