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
var QuestionsSchemas = mongoose.Schema({
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
                type: String,
                required: true
            },
            
        }],
        replyReplies: replies

    }],
    questionReplies: replies,
    questionLastUpdated:{
        type:Date,
    }


})