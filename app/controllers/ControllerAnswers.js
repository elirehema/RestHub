const Answers = require('../Schemas/SchemaAnswers');
const Comments = require('../Schemas/SchemaComments');
const Users = require('../Schemas/SchemaUsers');
const Questions= require('../Schemas/');


/** Get All Answers **/
exports.getAllAnswers = async function(req, res){
    await Answers.find();
} ;

/** Get Answer by its _id **/
exports.getAnswerByAnswerId = async function(req, res){
    await Answers.findById(req.params.answerId, function(err){
        if(err){

        }
    });
};
/** Get Answer by its Its question id **/
exports.getAnswersByQuestionId = async function(req, res){
    await Answers.find(req.params.answerId, function(err){
        if(err){

        }
    });
};