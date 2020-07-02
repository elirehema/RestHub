const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var schema = new Schema({
    message: {
        type: String,
        required: true,
    },
    questionId: { type: ObjectId, ref: sc.schema_questions },
    upvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }]
}, { emitIndexErrors: true, autoCreate: true, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
var handleE11000 = function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
};
schema.post('save', handleE11000);
schema.post('update', handleE11000);
schema.post('findOneAndUpdate', handleE11000);
schema.post('insertMany', handleE11000);

const _model = mongoose.model(sc.schema_replies, schema);

_model.createIndexes();

module.exports = _model;