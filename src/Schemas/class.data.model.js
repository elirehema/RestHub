const sc = require('../plugins/schemas');
const mongoose = require('mongoose');
var ClassesSchema = mongoose.Schema({
    name: { type: String, required: true, lowercase: true },
    code: { type: String, required: true, uppercase: true },
    date: { type: Date, default: Date.now,required: true }
});
module.exports = mongoose.model(sc.schema_classes, ClassesSchema);
