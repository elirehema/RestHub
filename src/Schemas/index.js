const db = {};
db.answers  = require('./answer.data.model.js')
db.messages = require('./messages.data.model.js');
db.products = require('./products.schema.model');
db.comments = require('./comment.schema.model.js');
db.users    = require('./user.schema.model.js');
db.contacts = require('./contact.data.model.js');
db.question = require('./question.schema.model');
db.classes  = require('./class.data.model');
db.replies  = require('./replies.data.model');
db.subject  = require('./subject.schema.model');




module.exports = db;