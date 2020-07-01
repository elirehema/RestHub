const routes = {};
routes.messages_route = require('./messages.routes');
routes.contacts_route = require('./contacts.routes');
routes.tags_route = require('./tags.routes');
routes.questions_route = require('./questions.routes');
routes.answers_route = require('./answers.routes');
routes.classes_route = require('./classes.routes');
routes.comments_route = require('./comments.routes');
routes.authentications_route = require('./authentications.routes');
routes.profiles_route = require('./profiles.routes');
routes.subjects_route = require('./subjects.routes');

module.exports = routes;