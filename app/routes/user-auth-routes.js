// api-routes.js
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
var UsersAuthController = require('../controllers/UserSchemaController');
// Contact routes
router.route('/auth')
    .get(UsersAuthController.index)
    .post(UsersAuthController.new);
router.route('/auth/:id')
    .patch(UsersAuthController.update)
    .put(UsersAuthController.update)
    .delete(UsersAuthController.delete);
router.route('/auth/login')
    .get(UsersAuthController.view)
// Export API routes
module.exports = router;