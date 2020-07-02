const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


var commentValidator = [
  validate({
    validator: 'isLength',
    arguments: [30, 100],
    message: 'Comment should be between 30 and 100 characters'
  })
];
var schema = new Schema({
  message: {
    type: String,
    required: true,
    validate: commentValidator
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: sc.schema_users }],
  by: { type: Schema.Types.ObjectId, ref: sc.schema_users },
  answerId: { type: ObjectId, ref: sc.schema_answers }
}, { emitIndexErrors: true, autoCreate: true, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const _model = mongoose.model(sc.schema_comments, schema);

module.exports = _model;