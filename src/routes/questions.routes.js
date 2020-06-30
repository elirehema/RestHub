let router = require('express').Router();
const auths = require('../middleware/auth');
var controllers = require('../controllers/');
const Controller = controllers.questions;

router.route('/questions')
    .get(Controller.getAllQuestions)
    .post(auths, Controller.askNewQuestion);
router.route('/questions/:qid')
    .get(Controller.getQuestionByQuestionId)
    .patch(auths, Controller.updateQuestion)
    .put(auths, Controller.updateQuestion)
    .delete(auths, Controller.deleteQuestion);
router.route('/questions/:qid/replies')
    .get(Controller.getAllQuestionReplies)
    .patch(auths, Controller.replyToQuestion);
router.route('/questions/:qid/replies/:rid')
    .get(Controller.getAllQuestionRepliesByReplyId);
router.route('/questions/:qid/answers')
    .get(Controller.getAllQuestionAnswers)
    .patch(auths, Controller.answerTheQuestion);
router.route('/questions/:qid/vote')
    .patch(auths, Controller.voteForQuestion);
router.route('/questions/:qid/answers/:aid')
    .get(Controller.getAllQuestionAnswerByAnswerId);


// Export API routes

module.exports = router;