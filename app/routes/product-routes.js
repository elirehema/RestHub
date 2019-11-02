// cont-routes.js
// Initialize express router

let router = require('express').Router();
const auths = require('../middleware/auth');
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
    .get(auths,productController.index)
    .post(auths, productController.new);
router.route('/products/:product_id')
    .get(auths,productController.view)
    .patch(auths, productController.update)
    .put(auths, productController.update)
    .delete(auths, productController.delete);
router.route('/product/comment/:product_id')
    .patch(auths, productController.comment);
// Export API routes
module.exports = router;