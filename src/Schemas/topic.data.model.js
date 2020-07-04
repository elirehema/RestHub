const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
    name: {
        type: String, required: true, lowercase: true, index: true, unique: true
    },
    code: { type: String, required: true },
    resorces: [{ type: Schema.Types.ObjectId, ref: sc.schema_resources }],
    questions: [{ type: Schema.Types.ObjectId, ref: sc.schema_questions }],
    valid: { type: Boolean, default: true },
}, { emitIndexErrors: true, autoCreate: true, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

var handleE11000 = function(error, res, next) {
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

const schema_model = mongoose.model(sc.schema_topic, schema);
schema_model.createIndexes();


module.exports = schema_model;