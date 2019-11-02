// productModel.js
var mongoose = require('mongoose');
products = require('../models/productModel');
Comment = require('../models/commentModel');
var commentSchema = new mongoose.Schema({ name: String });
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
    color: String,
    comments: [
        {
            sendername: {
                type: String
            },
            message: {
                type: String,
            },
            comment_on: {
                type: Date,
                default: Date.now
            }

        }
    ],
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