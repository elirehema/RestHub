//define QuestionController.js

var Schema = require('../Schemas/QuestionsSchemas')
exports.getAllQuestions = async function(req, res){
    await Schema.get( function(err, response){
        if (err) {
            res.json({
                status: res.statusCode,
                message: err.message,
            });
        }
        res.json({
            status: res.statusCode,
            message: "Retrieved successfully",
            data: response
        });
    });
}
/** Ask new question **/
exports.askNewQuestion = async function(req, res){
    var question = new Schema();
    question.question = req.param.question;
    question.save(function(err){
        if(err){ return res.json({ status: res.statusCode, error: err.message }); }
        res.json({
            status: res.statusCode,
            message: 'Created succesfully...!',
            data: question
        });
    })
}

/** Update Questions **/
exports.updateQuestion = async function(req, res){
    await Schema.findById(req.params.questionId, function (err, question) {
        if (err) res.send(err);
        question.question = req.body.question ? req.body.question : question.question;
        question.questionLastUpdated = Date.now();
     product.save(function (err) {
            if (err)
                res.json({
                    status: res.statusCode,
                    message: res.message,
                });
            res.json({
                status: res.statusCode,
                message: 'Updated Succesfully',
                data: question
            });
        });
    });
}

/** Get question by Id **/
exports.getQuestionById = async function(req, res){
    await Schema.findOne({_id: req.params.questionId }, function (err, question) {
        if (err)
                res.json({
                    status: res.statusCode,
                    message: res.message,
                });
            res.json({
                status: res.statusCode,
                message: 'Retrieved Succesfully',
                data: question
            });

    });
}