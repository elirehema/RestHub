// CommentsSchema for comments
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    commentedOn: {
        type: Date,
        default: Date.now,
        required: true,
    }
   
});

module.exports =  commentSchema;