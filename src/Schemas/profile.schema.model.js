//define user( i.e. Student Schemas)
var mongoose = require('mongoose');
const sc = require('../plugins/schemas');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, ref: sc.schema_auths },
    username: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    fullname: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: sc.schema_tags, unique: true }],
    thumbnail: { type: String, lowercase: true },

    city_state: {
        type: String
    },
    phone: {type: String    },

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
    class: { type: Schema.Types.ObjectId, ref: sc.schema_classes },
    answers: [{ type: Schema.Types.ObjectId, ref: sc.schema_answers }],
    comments: [{ type: Schema.Types.ObjectId, ref: sc.schema_comments }],
    replies: [{ type: Schema.Types.ObjectId, ref: sc.schema_replies }]


}, {  autoCreate: true, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const profile_schema = mongoose.model(sc.schema_profiles, schema);

profile_schema.createIndexes();

module.exports = profile_schema;