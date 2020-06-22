var mongoose = require('mongoose');

/*
  Define mongoose schema to represent MONGODB collection and 
  define a document within that collection. i.e @userSchema.

  Also defines an Instance Methods, static model methods and 
  compound Index

  */

const uniqueValidator = require('mongoose-unique-validator')
// Setup schema
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String,
    require: false
  },
  city: {
    type: String,
    require: false
  },
  country: {
    type: String,
    require: false
  },
  postal: {
    type: String,
    require: false
  }

}, { bufferCommands: false, collection: 'users' });
  /*
  Define Model instance method to work with
  */


 //getFullName method
userSchema.methods.getFullName = function() {
  return this.fname + " " + this.lname;
};

//find user with similar name in users schema
userSchema.methods.findUserWithSimilarname = function(cb) {
  return this.model('user').find({
    username: this.username
  }, cb);
};

//Find user with provided email address
userSchema.methods.findUserWithSimilarEmailAddress = function(email) {
  return this.model('user').find({
    email: this.email
  }, email);
};
    /**
     * Define Mongoose Query helper function for mongoose query
     * Let you extends Chainable Builder APi
     * https://mongoosejs.com/docs/queries.html
     * **/


userSchema.query.byName = function(name){
  return this.where({username: new RegExp(username, 'i')})
}
/**
 * Define Virtuals
 * **/

 userSchema.virtual('fullName').get(function(){
   return this.fname +' ' + this.lname;
 });


/*
  Convert UserSchema to UserModel so we can work with
  then
  Export UserModel model
*/
userSchema.plugin(uniqueValidator)
const UserModel = module.exports = mongoose.model('user', userSchema);


module.exports.get = function(callback, limit) {
  UserModel.find(callback).limit(limit);
};
