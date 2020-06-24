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

var ResourceDataModel = new Schema({
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
});

const ResourcesSchema = module.exports = mongoose.model(sc.schema_resources, ResourceDataModel);


module.exports.get = function (callback, limit) {
    ResourcesSchema.find(callback).limit(limit);
};