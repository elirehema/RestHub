//define user( i.e. Student Schemas)
var mongoose  = require('mongoose');
const sc = require('../plugins/schemas');
const { schema_answers } = require('../plugins/schemas');
var Schema = mongoose.Schema;
var UserSchemas = mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
   
    profile:[{
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
        bronze:{
            type: Number
        },
        silver:{
            type: Number
        },
        reputations:{
            type: Number
        },
        
    }],
    class:{ type: Number,required: false},
    userAnswers:[{type: Schema.Types.ObjectId, ref: schema_answers}],
    userComments:[{type: Schema.Types.ObjectId, ref: sc.schema_comments}]


});

var UserSchema = module.exports = mongoose.model(sc.schema_users, UserSchemas);