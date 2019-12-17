let router = require('express').Router();
const auths = require('../middleware/auth');
const Controller = require('../controllers/ControllerQuestions')

router.route('/questions')
    .get(Controller.getAllQuestions)
    .post(auths, Controller.askNewQuestion);
router.route('/questions/:questionId')
    .get(Controller.getQuestionById)
    .patch(auths, Controller.updateQuestion)
    .put(auths, Controller.updateQuestion);
router.route('/questions/:questionId/replies')
    .get( Controller.getAllQuestionReplies)
    .patch(auths, Controller.replyToQuestion)
router.route('/questions/:questionId/answers')
    .get( Controller.getAllQuestionAnswers)
    .patch(auths, Controller.answerTheQuestion)
router.route('/questions/:questionId/answers/ids')
    .get( Controller.getAllQuestionAnswerIds)
router.route('/questions/:questionId/replies/ids')
     .get( Controller.getAllQuestionRepliesIds)
router.route('/questions/:questionId/upvote/:answerId')
    .patch(auths, Controller.upvoteQuestionAnswer)


// Export API routes
module.exports = router;