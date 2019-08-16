// user-routes.js
// Initialize express router

let router = require('express').Router();
const auths = require('../middleware/auth');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
        throw: new Error('BROKEN')
    });
});
// Import contact controller
var userController = require('../controllers/UsersController');
// Contact routes
router.route('/users')
    .get(auths, userController.index)
    .post(auths,userController.new);

router.route('/users/:user_id')
    .get(auths,userController.view)
    .patch(auths,userController.update)
    .put(auths,userController.update)
    .delete(auths,userController.delete);
// Export API routes
module.exports = router;