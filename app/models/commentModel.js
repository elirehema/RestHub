// productModel.js
var mongoose = require('mongoose');
// Setup schema
var commentSchema = mongoose.Schema({
    sendername: {
        type: String
    },
    message: {
        type: String,
    },
    comment_on: {
        type: Date,
        default: Date.now
    }
   
},{ _id: false });
// Export Comment model
var Comment = module.exports = mongoose.model('comment', commentSchema);
module.exports.get = function (callback, limit) {
    Comment.find(callback).limit(limit);
};