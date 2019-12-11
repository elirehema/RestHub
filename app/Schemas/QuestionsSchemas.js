//define Questions Schema
var mongoose = require('mongoose');
var replies =  [{
    replyDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    replyMessage:{
        type:String,
        required: true,
    },
    replyVoters: [{
        userId:{
            type:String,
            required: true
        }
    }],
    replyInfo:[{
        userName:{
            type: String,
            required: true
        },
        userId:{
            type: String,
            required: true
        },
        
    }]
}];
var QuestionsSchemas = new mongoose.Schema({
    question:{
        type: String,
        required: true,
    },
    questionValidity:{
        type: Boolean,
        default: true
    },
    questionDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    questionVotes: Number,
    questionAnswers: [{
        replyDate:{
            type: Date,
            required: true,
            default: Date.now
        },
        replyMessage:{
            type:String,
            required: true,
        },
        replyVoters:[{
            userId:{
                type:String,
                required: true,
            }
        }],

        replyInfo:[{
            userName:{
                type: String,
                required: true
            },
            userId:{
                type: String
            },
            
        }],
        replyReplies: replies

    }],
    questionReplies: replies,
    questionLastUpdated:{
        type:Date,
    }


});

const QuestionsSchema = module.exports = mongoose.model('user_questions', QuestionsSchemas);


module.exports.get = function(callback, limit) {
  QuestionsSchema.find(callback).limit(limit);
};