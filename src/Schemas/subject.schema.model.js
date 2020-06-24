var mongoose = require('mongoose');
const sc = require('../plugins/schemas');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var SubjectSchema = Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    topics: [{ type: Schema.Types.ObjectId, ref: sc.schema_topic }],
    valid: { type: Boolean, default: true },
});
var Subjects = module.exports = mongoose.model(sc.schema_subject, SubjectSchema);
