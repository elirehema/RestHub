//define user( i.e. Student Schemas)
var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var UserSchemas = mongoose.Schema({
    userName:{
        type:String,
        required: true,
    },
    userForm:{
        type: Number,
        required: false
    },
    userProfile:[{
        userSocialAccounts:[{
            accounName:{
                type:String,
                required: true
            },
            accountUrl:{
                type:String,
                required: true
            },
            
        }],
        userFullName:{
            type:String,
            required:false
        },
        userEmail:{
            type:String,
            required: false
        },
        userInterests:[{
            iterestName:{
                type:String,
                required:false
            }
        }]
        
    }],
    userTagsAccountTags:[{
        tagName:{
            type:String,
            required: true
        }
    }],
    userScores:[{
        bronzeBadge:{
            type: Number
        },
        silverBadge:{
            type: Number
        },
        reputations:{
            type: Number
        },
        
    }],
    userAnswers:[{type: Schema.Types.ObjectId, ref: 'opus_answers'}],
    userComments:[{type: Schema.Types.ObjectId, ref: 'opus_comments'}]


})

var UserSchema = module.exports = mongoose.model('opus_users', UserSchemas);