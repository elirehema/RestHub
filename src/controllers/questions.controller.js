const db = require('../Schemas/');
const sc = require('../plugins/schemas');
const { replies, answers } = require('../Schemas/');
const Questions = db.questions;
const Answer = db.answers;
const Replies = db.replies;
const Comments = db.comments;
const controller = {};
controller.getAllQuestions = async function (req, res) {
    await Questions.

        aggregate([
            {
                $addFields: {
                    totalreplies: { $size: "$replies" },
                    totalanswers: { $size: "$answers" }
                },

            },
            {
                $lookup: {
                    from: sc.schema_replies,
                    localField: "_id",
                    foreignField: "questionId",
                    as: "replies"
                }
            },
            {
                $lookup: {
                    from: sc.schema_answers,
                    localField: "_id",
                    foreignField: "questionId",
                    as: "answers"
                }
            }
        ])
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: err.statusCode,
                    message: err.message,
                });
            }

            res.json({
                status: res.statusCode,
                method: req.method,
                message: req.statusMessage,
                data: response
            });
        });
};
/** Ask new question **/
controller.askNewQuestion = async function (req, res) {
    var question = new Questions();
    question.question = req.body.question;
    question.save(function (err) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
        }
        res.json({
            status: res.statusCode,
            message: 'Created succesfully...!',
            data: question
        });
    });
};

/** Update Questions **/
controller.updateQuestion = async function (req, res) {
    await Questions.findById(req.params.questionId, function (err, question) {
        if (err) res.send(err);
        question.question = req.body.question ? req.body.question : question.question;
        question.questionLastUpdated = Date.now();
        question.save(function (err) {
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
};
/**Delete Questions **/
controller.deleteQuestion = async function (req, res) {
    await Comments.remove({
        _id: req.params.questionId
    }, function (err, question) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'Question Deleted Succesfully ...'
        });
    });
};

/** Get question by Id **/
controller.getQuestionById = async function (req, res) {
    await Questions.findOne({ _id: req.params.questionId })
        .populate({ path: "answers", select: ' -questionId -__v' })
        .populate({ path: "replies", select: ' -questionId -__v' })
        .exec(function (err, question) {
            if (err) return handleError(err);
            res.json({
                status: res.statusCode,
                message: 'Created succesfully...!',
                data: question,
            });
        });
};
/** Answer  to specific question **/
controller.answerTheQuestion = async function (req, res) {
    var answer = new Answer();
    Questions.findOneAndUpdate(
        { _id: req.params.questionId },
        { $push: { answers: answer._id } },
        function (error, success) {
            if (error) {
                res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                });
            } else {
                answer.message = req.body.message;
                answer.questionId = req.params.questionId;
                answer.save(function (err) {
                    if (err) {
                        return res.json({ status: res.statusCode, error: err.message });
                    }
                    res.json({
                        status: res.statusCode,
                        message: 'Created succesfully...!',
                        data: answer
                    });
                });
            }
        });
};

/** Reply to specific question **/
controller.replyToQuestion = async function (req, res) {
    var reply = new Replies();
    Questions.findOneAndUpdate(
        { _id: req.params.questionId },
        { $push: { replies: reply._id } },
        function (error, success) {
            if (error) {
                console.log(error);
                res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                });
            } else {
                reply.message = req.body.message;
                reply.questionId = req.params.questionId;
                reply.save(function (err) {
                    if (err) {
                        return res.json({ status: res.statusCode, error: err.message });
                    }
                    res.json({
                        status: res.statusCode,
                        message: 'Created succesfully...!',
                        data: reply
                    });
                });
            }
        });
};

/** Get Specific Question Replies **/
controller.getAllQuestionReplies = async function (req, res) {
    await Questions.findOne({ _id: req.params.questionId }).select('replies')
        .populate({ path: "replies" })
        .exec(function (err, answers) {
            if (err) {
            } else {
                res.json({
                    message: 'Created succesfully...!',
                    data: answers,
                });
            }

        });
};

/** Get Specific Question Answers ID's**/
controller.getAllQuestionAnswerIds = async function (req, res) {
    await Questions.findOne({ _id: req.params.questionId }).select('questionAnswers')
        .exec(function (error, answers) {
            if (error) {
                res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                });
            } else {
                res.json({
                    message: 'Created succesfully...!',
                    data: answers,
                });
            }

        });
};

/** Get Specific Question Replies ID's**/
controller.getAllQuestionRepliesIds = async function (req, res) {
    await Questions.findOne({ _id: req.params.questionId }).select('questionReplies')
        .exec(function (error, answers) {
            if (error) {
                res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                });
            } else {
                res.json({
                    message: 'Created succesfully...!',
                    data: answers,
                });
            }

        });
};

/** Get Specific Question Answers **/
controller.getAllQuestionAnswers = async function (req, res) {
    await Questions.findOne({ _id: req.params.questionId }).select('answers')
        .populate({ path: "answers" })
        .exec(function (err, answers) {
            if (err) {
            } else {
                res.json({
                    message: 'Created succesfully...!',
                    data: answers,
                });
            }

        });
};
/** Get Specific Question AnswerById **/
controller.getAllQuestionAnswerByAnswerId = async function (req, res) {
    await Questions.findOne({ _id: req.params.questionId }).select('answers')
        .populate({ path: "answers", select: '-__v -questionId' })
        .exec(function (err, response) {
            if (err) {
            } else {
                res.json({
                    message: res.message,

                    data: response.answers.find(answer => answer._id = req.params.answerId),
                });
            }

        });
};
controller.getAllQuestionRepliesByReplyId = async function (req, res) {
    await Questions.findOne({ _id: req.params.questionId }).select('replies')
        .populate({ path: "replies", select: '-__v -questionId' })
        .exec(function (err, response) {
            if (err) {
            } else {
                res.json({
                    message: res.message,

                    data: response.replies.find(reply => reply._id = req.params.rid),
                });
            }

        });
};
controller.voteForQuestion = async function (req, res) {
    console.log("Kik");
    if (req.query.operation === "upvote"){
    await Questions.findOneAndUpdate(
        { _id: req.params.questionId },
        { $addToSet: { upvotes: req.params.uid } },
        function (err, question) {
            if (err) {
                res.json({
                    status: err.status
                });
            }
            res.json({
                status: res.status,
                data: question
            });
        });
    }
    if (req.query.operation === "downvote"){
    await Questions.findOneAndUpdate(
        { _id: req.params.questionId },
        { $addToSet: { downvotes: req.params.uid } },
        function (err, question) {
            if (err) {
                res.json({
                    status: err.status
                });
            }
            res.json({
                status: res.status,
                data: question
            });
        });
    }
};

handleError = function (err) {
    console.log("Error " + err + "has occured !!!");
};

module.exports = controller;