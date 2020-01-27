let router = require('express').Router();
const auth = require('../middleware/auth');
var Controller = require('../controllers/ControllerAnswers');

router.route('/answers')
    .get(Controller.getAllAnswers);
router.route('/answers/:questionId')
    .get(Controller.getAnswersByQuestionId)


module.exports = router;