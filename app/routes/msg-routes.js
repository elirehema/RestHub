// cont-routes.js
// Initialize express router

let router = require('express').Router();
const auths = require('../middleware/auth');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var messageController = require('../controllers/MessageController');
// Contact routes
router.route('/message')
    .get(messageController.index)
    .post(auths,messageController.new);
router.route('/message/:message_id')
    .get(messageController.view)
    .patch(auths,messageController.update)
    .put(auths,messageController.update)
    .delete(auths,messageController.delete);
// Export API routes
module.exports = router;