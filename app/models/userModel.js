var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    username:{
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
        required: true },
    email: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
userSchema.methods.getFullName = function () {
    return this.fname + " " + this.lname;
  }
// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};