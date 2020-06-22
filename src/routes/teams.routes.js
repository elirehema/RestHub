let router = require('express').Router();
const auths = require('../middleware/auth');
const controllers = require('../controllers/');
const productController =  controllers.questions;

// Contact routes
router.route('/team/league/:league_id')
    .get(productController.find)
    .post(auths, productController.new);
router.route('/team/:team_id')
    .get(productController.view)
    .patch(auths, productController.update)
    .put(auths, productController.update)
    .delete(auths, productController.delete);
// Export API routes
module.exports = router;