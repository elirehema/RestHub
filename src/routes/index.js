const routes = {};
routes.messages_route = require('./messages.routes');
routes.contacts_route = require('./contacts.routes');
routes.products_route = require('./products.routes');

routes.questions_route = require('./questions.routes');
routes.answers_route = require('./answers.routes');
routes.classes_route = require('./classes.routes');
routes.comments_route = require('./comments.routes');
routes.authentications_route = require('./authentications.routes');
routes.users_route = require('./users.routes');
module.exports = routes;