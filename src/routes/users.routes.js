const controllers = require('../controllers/');
let router = require('express').Router();
const auths = require('../middleware/auth');
var userController = controllers.users;
router.route('/users')
    .get( userController.index)
    .post(auths,userController.new);

router.route('/users/:user_id')
    .get(userController.view)
    .patch(auths,userController.update)
    .put(auths,userController.update)
    .delete(auths,userController.delete);
// Export API routes
module.exports = router;