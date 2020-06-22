let router = require('express').Router();
const controllers = require('../controllers/');
const AuthController = controllers.authentication;
// Contact routes
router.route('/auths')
    .get(AuthController.index)
    .post(AuthController.new);
router.route('/auths/:id')
    .patch(AuthController.update)
    .put(AuthController.update)
    .delete(AuthController.delete);
router.route('/auths/login')
    .post(AuthController.view);
router.route('/auths/logout')
    .get(AuthController.logout);
// Export API routes
module.exports = router;