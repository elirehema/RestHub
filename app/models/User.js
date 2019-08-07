var mongoose = require('mongoose');
// Setup schema
let Schema = mongoose.Schema;
var userSchema = new Schema({UserID: {
        type: mongoose.Schema.Types.Mixed,
    },
    UserInfo: {
        Username: {
            type: String,
            required: true
        },
        FirstName: {
            type: String,
            required: true
        },
        LastName: {
            type: String,
            required: true
        },
        FullName: {
            type: String,
            required: true
        },
        CurrentAddress: {
            type: String,
            required: true
        },
        EmailAddress: {
            type: String,
            required: true
        },
    },
    CreateAt: {
        type: Date,
        default: Date.now
    },
    LastUpdated:{
        type: Date,
        default: Date.now
    },
    PhoneNumbers: [{
        HomePhone: {
            type: Number,
        },
        WorkPhone: {
            type: Number,
        },
        CellPhone: {
            type: Number,
        },
        PhoneVerified: [{
            Home: Boolean,
            Work: Boolean,
            Cell: Boolean,
        }],
    }]});
userSchema.methods.getFullName = function () {
    return this.UserInfo.FirstName + " " + this.UserInfo.LastName;
  };
//find user with similar name in users schema
userSchema.methods.findUserWithSimilarname = function (cb) {
  return this.model('user').find({username: this.username}, cb);
};
//
userSchema.methods.findUserWithSimilarEmailAddress = function(email){
    return this.model('user').find({email: this.email}, email);
}
// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};