let router = require('express').Router();
const auths = require('../middleware/auth');
var Controller = require('../controllers').tags;
// Contact routes
router.route('/tags')
    .get(Controller.getAllTags)
    .post(auths, Controller.createNewTag);
router.route('/tags/:id')
    .get(Controller.getTagByTagId)
    .patch(auths, Controller.updateTagByTagId)
    .put(auths, Controller.updateTagByTagId)
    .delete(auths, Controller.deleteTag);

// Export API routes
module.exports = router;