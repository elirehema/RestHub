const Answers = require('../Schemas/SchemaAnswers');
const Comments = require('../Schemas/SchemaComments');
const Users = require('../Schemas/SchemaUsers');
const Questions= require('../Schemas/SchemaQuestions');


/** Get All Answers **/
exports.getAllAnswers = async function(req, res){
    await Answers.find({})
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
} ;

/** Get Answer by its _id **/
exports.getAnswerByAnswerId = async function(req, res){
    await Answers.findOne({_id:req.params.answerId})
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
};
exports.getAnswerVoters = async function(req, res){
    await Answers.findOne({_id:req.params.answerId}).select('answerVoters')
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
};
exports.getAnswerComments = async function(req, res){
    await Answers.findOne({_id:req.params.answerId}).select('answerComments')
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
};


/** Get Answer by its Its question id **/
exports.getAnswersByQuestionId = async function(req, res){
    await Answers.find(req.params.answerId, function(err){
        if(err){

        }
    });
};