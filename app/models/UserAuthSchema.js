var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
    jwt = require('jsonwebtoken');
    config = require('../config/config');

var UserAuthSchema = new Schema({
    username: { type: String,  unique: true, lowercase: true, required: 'EmailInvalid' },
    password: { type: String, required: true }
});
UserAuthSchema.index({ username: 1 }, { unique: true });
UserAuthSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserAuthSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
var AuthSchema = module.exports = mongoose.model('UserAuth', UserAuthSchema);
module.exports.get = function (callback, limit) {
    AuthSchema.find(callback).limit(limit);
};