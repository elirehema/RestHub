const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var schema = new Schema({
    message: {
        type: String,
        required: true,
    },
    questionId: { type: Schema.Types.ObjectId, ref: sc.schema_questions },
    upvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
    comments: [{ type: Schema.Types.ObjectId, ref: sc.schema_comments }]

}, { emitIndexErrors: true, autoCreate: true,  timestamps: { createdAt: 'created_at',updatedAt:'updated_at' }});

const answer_schema = mongoose.model(sc.schema_answers, schema);


module.exports = answer_schema;