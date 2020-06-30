const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

    var validate = require('mongoose-validator');

var commentValidator = [
  validate({
    validator: 'isLength',
    arguments: [30, 100],
    message: 'Comment should be between 30 and 100 characters'
  })
];
var SchemaComments = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    message: {
        type: String,
        required: true,
        validate: commentValidator
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
    by: { type: Schema.Types.ObjectId, ref: sc.schema_users },
    answerId: { type: ObjectId, ref: sc.schema_answers }
});

var SchemaComment = module.exports = mongoose.model(sc.schema_comments, SchemaComments);