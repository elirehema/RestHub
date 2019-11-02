// Import product model
Product = require('../models/productModel');
Comments = require('../models/commentModel');
// Handle index actions

exports.index = async  function (req, res) {
    await Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: res.statusCode,
            message: "Product retrieved successfully",
            data: products
        });
    });
};
// Handle create product actions
exports.new = async  function (req, res) {
    var product = new Product();
    product.name = req.body.name ? req.body.name : product.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.phone = req.body.phone;
    product.color = req.body.color;
    product.comments = null;
    // save the product and check for errors
     product.save(function (err) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
        }
        //res.json({ status: 500, product: product });
        res.json({
            status: res.statusCode,
            message: 'New product created!',
            data: product
        });
    });
};
// Handle view product info
exports.view = async function (req, res) {
    await Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err.message);
        res.json({
            status: res.statusCode,
            message: 'Product details loading..',
            data: product
        });
    });
};
// Handle update product info
exports.update = async  function (req, res) {
    await Product.findById(req.params.product_id, function (err, product) {
        if (err) res.send(err);
        product.name = req.body.name ? req.body.name : product.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.phone = req.body.phone;
        product.color = req.body.color;
        // save the product and check for errors
     product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: res.statusCode,
                message: 'Product Info updated',
                data: product
            });
        });
    });
};
exports.comment = async function(req, res){
    await Product.findByIdAndUpdate(req.params.product_id, {
        $push: {
            'comments': {sendername: "Elirehema", message: "req.body.message", comment_on: Date.now()}
        }
            },
        function (err) {
            if (err) {
                console.log(err.statusCode)
            }else {

            }
        }
    );
};

// Handle delete product
exports.delete = async function (req, res) {
   await  Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'Product deleted'
        });
    });
};