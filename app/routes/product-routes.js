// cont-routes.js
// Initialize express router

let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var productController = require('../controllers/productController');
// Contact routes
router.route('/products')
    .get(productController.index)
    .post(productController.new);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);
// Export API routes
module.exports = router;