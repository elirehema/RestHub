let router = require('express').Router();
const auths = require('../middleware/auth');
const controller = require('../controllers').topics;

// Contact routes
router.route('/topics/')
    .get(controller.funRetrieveAllTopics)
    .post(auths, controller.funCreateNewTopic);
router.route('/topics/:id');


module.exports = router;