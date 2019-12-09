
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const userSchema = new Schema({UserID: {
        type: mongoose.Schema.Types.Mixed,
    },
    UserInfo: {
        FirstName: {
            type: String,
        },
        LastName: {
            type: String,
        },
        CurrentAddress: {
            type: String,
        },
        EmailAddress: {
            type: String,
        },
    },
    PhoneNumbers: [{
        HomePhone: {
            type: Number,
        },
        WorkPhone: {
            type: Number,
        },
        CellPhone: {
            type: Number,
        },
        PhoneVerified: [{
            Home: Boolean,
            Work: Boolean,
            Cell: Boolean,
        }],
    }],});


const User = mongoose.model('User', userSchema);
module.exports = User;