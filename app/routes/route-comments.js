let router = require('express').Router();
const auth = require('../middleware/auth');
var Controller = require('../controllers/ControllerComments');

module.exports = router