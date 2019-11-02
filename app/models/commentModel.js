// productModel.js
var mongoose = require('mongoose');

// Setup schema
var commentSchema = new mongoose.Schema({
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
   
});

module.exports =  commentSchema;