let router = require('express').Router();
const auth = require('../middleware/auth');
var controllers = require('../controllers/');
var Controller = controllers.answers;

router.route('/answers')
    .get(Controller.getAllAnswers);
router.route('/answers/:aid')
    .get(Controller.getAnswerByAnswerId);
router.route('/answers/:aid')
    .get(Controller.getAnswerByAnswerId);
router.route('/answers/:aid/votes')
    .get(Controller.getAnswerVotes)
    .put(auth, Controller.upvoteAnswer);
router.route('/answers/:aid/comments')
    .get(Controller.getAnswerComments)
    .patch(auth, Controller.commentOnQuestionAnswer);
module.exports = router;