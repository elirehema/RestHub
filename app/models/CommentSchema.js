// productModel.js
var mongoose = require('mongoose');

// Setup schema
var commentSchema = new mongoose.Schema({
    sendername: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    comment_on: {
        type: Date,
        default: Date.now,
        required: true
    }
   
});

module.exports =  commentSchema;