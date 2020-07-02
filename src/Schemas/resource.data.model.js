var mongoose = require('mongoose');
const sc = require('../plugins/schemas');
var validate = require('mongoose-validator');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

    var descriptionValidator = [
        validate({
          validator: 'isLength',
          arguments: [10, 50],
          message: 'Name should be between 3 and 50 characters'
        }),
        validate({
          validator: 'isAlphanumeric',
          passIfEmpty: true,
          message: 'Name should contain alpha-numeric characters only'
        })
      ];
      var nameValidator = [
        validate({
          validator: 'isLength',
          arguments: [3, 50],
          message: 'Name should be between 3 and 50 characters'
        }),
        validate({
          validator: 'isAlphanumeric',
          passIfEmpty: true,
          message: 'Name should contain alpha-numeric characters only'
        })
      ];

var schema = new Schema({
    name:{
        type: String,
        required: true,
        validate: nameValidator
        
    },
    description:{
        type:String,
        required: true,
        validate: descriptionValidator
    }
},{ emitIndexErrors: true, autoCreate: true,  timestamps: { createdAt: 'created_at',updatedAt:'updated_at' }});

const resources_schema  = mongoose.model(sc.schema_resources, schema);


module.exports = resources_schema;