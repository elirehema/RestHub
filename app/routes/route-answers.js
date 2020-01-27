let router = require('express').Router();
const auth = require('../middleware/auth');
var Controller = require('../controllers/ControllerAnswers');

router.route('/answers')
    .get(Controller.getAllAnswers);
router.route('/answers/:questionId')
    .get(Controller.getAnswersByQuestionId);

router.route('/answer/:answerId/votes')
    .get(Controller.getAnswerVoters);
router.route('/answer/:answerId/comments')
    .get(Controller.getAnswerComments);
module.exports = router;