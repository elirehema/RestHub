//define user( i.e. Student Schemas)
var mongoose = require('mongoose');
const sc = require('../plugins/schemas');
const { schema_answers } = require('../plugins/schemas');
var Schema = mongoose.Schema;
var UserSchemasModel = mongoose.Schema({
    _id:  { type:  Schema.Types.ObjectId, ref: sc.schema_auths },
    username: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    fullname: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: sc.schema_tags }],
    scores: [{
        bronze: {
            type: Number
        },
        silver: {
            type: Number
        },
        reputations: {
            type: Number
        },

    }],
    class: { type:  Schema.Types.ObjectId, ref: sc.schema_classes },
    answers: [{ type: Schema.Types.ObjectId, ref: sc.schema_answers }],
    comments: [{ type: Schema.Types.ObjectId, ref: sc.schema_comments }],
    replies: [{ type: Schema.Types.ObjectId, ref: sc.schema_replies }]


});
module.exports = mongoose.model(sc.schema_users, UserSchemasModel);