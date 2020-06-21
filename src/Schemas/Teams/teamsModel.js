var mongoose = require('mongoose');

/*
  Define mongoose schema to represent MONGODB collection and 
  define a document within that collection. i.e @TeamSchema.

  Also defines an Instance Methods, static model methods and 
  compound Index

  */
// Setup schema
var teamSchema = mongoose.Schema({
  team_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  founded: {
    type: Number,
    required: true
  },
  venue_name: {
    type: String,
    required: true
  },
  venue_surface: {
    type: String,
    required: true
  },
  venue_address: {
    type: String,
    require: false
  },
  venue_city: {
    type: String,
    require: false
  },
  venue_capacity: {
    type: Number,
    require: true
  }

});
  /*
  Define Model instance method to work with
  */

/** 
  Convert TeamSchema to TeamModel so we can work with
  then
  Export TeamModel model
*/
const TeamModel = module.exports = mongoose.model('team', teamSchema);
module.exports.get = function(callback, limit) {
  TeamModel.find(callback).limit(limit);
};
