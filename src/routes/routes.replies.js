let router = require('express').Router();
const auths = require('../middleware/auth');
var controllers = require('../controllers/');
const Controller = controllers.questions;