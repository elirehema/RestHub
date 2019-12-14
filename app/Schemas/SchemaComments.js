
var mongoose  = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var SchemaReplies = new Schema({
    Date:{
        type: Date,
        required: true,
        default: Date.now
    },
    answerMessage:{
        type:String,
        required: true,
    },
    replyVoters: [{ type: ObjectId, ref: 'opus_users' }],
    answerId: { type: ObjectId, ref: 'opus_answers' },
    userId: { type: ObjectId, ref: 'opus_users' }

})

var SchemaReplie = module.exports = mongoose.model('opus_comments', SchemaReplies);