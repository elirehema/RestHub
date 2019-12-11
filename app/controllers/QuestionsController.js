//define QuestionController.js

Schema = require('../Schemas/QuestionsSchemas')
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
    question.question = req.body.question;
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
/** Reply to specific question **/
exports.replyToSpecifiQuestion = async function(req,res){
    var chilval = {
        $addToSet: {  replyInfo:[
            { userName: req.body.username, userId: req.body.userId}]}
    };
    var update = {
        $addToSet: { questionAnswers : {
            replyMessage: req.body.message,
            replyInfo: chilval,
          
        }}
      }
    await Schema.findByIdAndUpdate(req.params.questionId,update,function (err) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
          } else { res.json({ status: res.statusCode, message: 'Comment sent !'});}
    });
}