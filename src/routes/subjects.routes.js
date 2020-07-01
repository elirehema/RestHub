let router = require('express').Router();
const auths = require('../middleware/auth');
var controller = require('../controllers/').subjects;

router.route('/subjects')
    .get(controller.getAllSubjects)
    .post(auths, controller.createNewSubject);

router.route('/subjects/:id')
    .get(controller.getSubjectById)
    .put(auths, controller.updateSubject)
    .patch(auths, controller.updateSubject);


module.exports = router;