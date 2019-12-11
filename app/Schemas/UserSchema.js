//define user( i.e. Student Schemas)
var mongoose  = require('mongoose');
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
    userParticipation:[{
        participationTitle:{
            type:String,
            required: true,
        },
        participationId:{
            type:String,
            required:true
        },
        participationScores:{
            type: Number,
            required: true
        },
        participationDate:{
            type: Date,
            required: true
        }
    }],


})

var UserSchema = module.exports = mongoose.model('UsersSchema', UserSchemas);