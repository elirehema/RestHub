const sc = require('../plugins/schemas');
const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String, required: true },
    color: { type: String, required: true },
    comments: [{
       name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    }],
    created_date: { type: Date, default: Date.now }
});


// Export Product model
var Product = module.exports = mongoose.model(sc.schema_products, productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
};