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
    .get(productController.index)
    .post(auths, productController.createNewProduct);
router.route('/products/:productId')
    .get(productController.view)
    .patch(auths, productController.update)
    .put(auths, productController.update)
    .delete(auths, productController.delete);
router.route('/products/:productId/comments')
    .patch(auths, productController.sendComments)
    .get( productController.getAllComments )
router.route('products/:productId/comment/:commentId')
    .get( productController.getCommentById)

// Export API routes
module.exports = router;