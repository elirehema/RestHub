// productModel.js
var mongoose = require('mongoose');
comment = require('../models/productModel');
// Setup schema
var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
        },
    phone: String,
    color:String,
    comments: comment,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Product model
var Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
};