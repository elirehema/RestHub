const router = require('express').Router();
const auths = require('../middleware/auth');
var controllers = require('../controllers/');
var contactController = controllers.contacts;
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