// cont-routes.js
// Initialize express router

let router = require('express').Router();
// Initialize express router
const auths = require('../middleware/auth');


// Import contact controller
var contactController = require('../controllers/contactController');
// Contact routes
router.route('/contacts')
    .get( contactController.index)
    .post(auths,contactController.new);
router.route('/contacts/:contact_id')
    .get( contactController.view)
    .patch(auths, contactController.update)
    .put(auths,contactController.update)
    .delete(auths,contactController.delete);
// Export API routes
module.exports = router;