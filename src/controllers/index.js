const controllers = {};

controllers.authentication = require('./authentication.controller');
controllers.answers = require('./answers.controller');
controllers.classes = require('./classes.controller');
controllers.comments = require('./comments.controller');
controllers.questions = require('./questions.controller');
controllers.messages = require('./messages.controller');
controllers.tags = require('./tags.controller');
controllers.profiles = require('./profiles.controller');
controllers.contacts = require('./contacts.controller.js');
controllers.subjects = require('./subjects.controller.js');

module.exports = controllers;