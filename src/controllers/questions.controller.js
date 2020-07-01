const db = require('../Schemas/');
var mongoose = require('mongoose');
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
                $project: {
                    question: "$question",
                    date: "$date",
                    updated: "$updated",
                    valid: "$valid",
                    description: "$description",
                    totalreplies: { $size: "$replies" },
                    totalanswers: { $size: "$answers" },
                    upvotes: { $size: "$upvotes" },
                    downvotes: { $size: "$downvotes" }

                }
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

            res.json(response);
        });
};
/** Ask new question **/
controller.askNewQuestion = async function (req, res) {
    var question = new Questions();
    question.question = req.body.question;
    question.description = req.body.description;
    question.save(function (err) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
        }
        res.json(question);
    });
};

/** Update Questions **/
controller.updateQuestion = async function (req, res) {
    await Questions.findById(req.params.qid, function (err, question) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
        }
        if (null == question) {
            return res.json({ status: res.statusCode, message: 'No Data available! ' });
        } else {
            question.question = req.body.question ? req.body.question : question.question;
            question.description = req.body.description ? req.body.description : question.description;
            question.questionLastUpdated = Date.now();
            question.save(function (err) {
                if (err)
                    res.json({
                        status: res.statusCode,
                        message: res.statusMessage,
                    });
                res.json({
                    status: res.statusCode,
                    message: req.statusMessage,
                    data: question
                });
            });
        }
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
controller.getQuestionByQuestionId = async function (req, res) {
    await Questions.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.qid) } },
        {
            $project: {
                question: "$question",
                date: "$date",
                updated: "$updated",
                valid: "$valid",
                description: "$description",
                totalreplies: { $size: "$replies" },
                totalanswers: { $size: "$answers" },
                upvotes: { $size: "$upvotes" },
                downvotes: { $size: "$downvotes" }

            }
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
            if (err) return handleError(err);
            res.json(response);
        });
};
/** Answer  to specific question **/
controller.answerTheQuestion = async function (req, res) {
    var answer = new Answer();
    Questions.findOneAndUpdate(
        { _id: req.params.qid },
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
                answer.questionId = req.params.qid;
                answer.save(function (err) {
                    if (err) {
                        return res.json({ status: res.statusCode, error: err.message });
                    }
                    res.json({
                        status: res.statusCode,
                        message: req.statusMessage,
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
        { _id: req.params.qid },
        { $push: { replies: reply._id } },
        function (error, success) {
            if (error) {
                res.json({
                    message: error.message,
                    status: res.statusCode
                });
            } else {
                reply.message = req.body.message;
                reply.questionId = req.params.qid;
                reply.save(function (err) {
                    if (err) {
                        return res.json({ status: res.statusCode, error: err.message });
                    }
                    res.json({
                        status: res.statusCode,
                        message: req.statusMessage,
                        data: reply
                    });
                });
            }
        });
};

/** Get Specific Question Replies **/
controller.getAllQuestionReplies = async function (req, res) {
    if(req.query.q === "id"){
        await Questions.findOne({ _id: req.params.qid }).select('replies')
        .exec(function (err, payload) {
            if (err) {
            } else {
               return res.json(payload.replies);
            }

        });

    }else{
    await Questions.findOne({ _id: req.params.qid }).select('replies')
        .populate({ path: "replies", select: "-questionId -__v"})
        .exec(function (err, payload) {
            if (err) {
            } else {
                return res.json(payload.replies);
            }

        });
    }
};

/** Get Specific Question Answers **/
controller.getAllQuestionAnswers = async function (req, res) {
    if(req.query.q === "id"){
    await Questions.findOne({ _id: req.params.qid }).select('answers')
        .exec(function (err, payload) {
            if (err) {
            } else {
                return res.json(payload.answers);
            }

        });
    }else{
        await Questions.findOne({ _id: req.params.qid }).select('answers')
        .populate({ path: "answers" })
        .exec(function (err, payload) {
            if (err) {
            } else {
                return res.json(payload.answers);
            }

        });

    }
};
/** Get Specific Question AnswerById **/
controller.getAllQuestionAnswerByAnswerId = async function (req, res) {
    await Questions.findOne({ _id: req.params.qid }).select('answers')
        .populate({ path: "answers", select: '-__v -questionId' })
        .exec(function (err, response) {
            if (err) {
            } else {
                res.json({
                    message: res.message,

                    data: response.answers.find(answer => answer._id = req.params.aid),
                });
            }

        });
};

controller.getAllQuestionRepliesByReplyId = async function (req, res) {
    await Questions.findOne({ _id: req.params.qid }).select('replies')
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
    let uid = req.session.userId;
    if (req.query.o === "upvote") {
        await Questions.findOneAndUpdate(
            { _id: req.params.questionId },
            { $addToSet: { upvotes: uid }, },

            function (err, question) {
                question.save();
            });
        await Questions.findOneAndUpdate(
            { _id: req.params.questionId },
            { $pull: { downvotes: uid }, },

            function (err, question) {
                if (err) {
                    res.json({
                        status: err.statusCode
                    });
                }
                res.json({
                    status: res.statusCode,
                    data: question
                });
            });



    }
    if (req.query.o === "downvote") {
        await Questions.findOneAndUpdate(
            { _id: req.params.questionId },

            { $addToSet: { downvotes: uid } },


            function (err, question) {
                question.save();
            });

        await Questions.findOneAndUpdate(
            { _id: req.params.questionId },
            { $pull: { upvotes: uid }, },

            function (err, question) {
                if (err) {
                    res.json({
                        status: err.statusCode
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
    console.log("Error " + err + "has occurred !!!");
};

module.exports = controller;