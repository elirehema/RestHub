let router = require('express').Router();
const auths = require('../middleware/auth');
var controllers = require('../controllers/');
var messageController = controllers.messages;
// Contact routes
router.route('/messages')
    .get(messageController.index)
    .post(auths,messageController.new);
router.route('/messages/:message_id')
    .get(messageController.view)
    .patch(auths,messageController.update)
    .put(auths,messageController.update)
    .delete(auths,messageController.delete);
// Export API routes
module.exports = router;