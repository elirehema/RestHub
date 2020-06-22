let router = require('express').Router();
const auth = require('../middleware/auth');
var controllers = require('../controllers/');
var Controller = controllers.comments;

router.route('/comments')
    .get(Controller.getAllComments);
router.route('/comments/:userId')
    .get(auth, Controller.getCommentsByUserId);
router.route('/comments/:commentId')
    .get(Controller.getCommentsByAnswerId);

module.exports = router;