const controller = require('../controllers').profiles;
let router = require('express').Router();
const auths = require('../middleware/auth');
router.route('/profiles')
    .get( controller.getProfilesList);
router.route('/profiles/:id')
    .get(controller._getProfileById)
    .patch(auths,controller._updateProfile)
    .put(auths,controller._updateProfile)
    .delete(auths,controller.delete);
// Export API routes
module.exports = router;