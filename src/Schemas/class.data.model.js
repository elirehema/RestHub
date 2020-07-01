const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
    name: { type: String, required: true, lowercase: true, unique: true },
    code: { type: String, required: true, uppercase: true, unique: true }
}, { emitIndexErrors: true, autoCreate: true,  timestamps: { createdAt: 'created_at',updatedAt:'updated_at' }});
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

var classschema = module.exports = mongoose.model(sc.schema_classes, schema);

classschema.createIndexes();

module.exports = classschema;
