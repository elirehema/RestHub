//TEAM ROUTERS

let router = require('express').Router();
const auths = require('../middleware/auth');

/**
 *  Import contact controller
 * **/
var productController = require('../controllers/Teams/TeamsController');
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