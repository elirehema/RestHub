const db = require('../Schemas');
const sc = require('../plugins/schemas');
var mongoose = require('mongoose');
const Answers = db.answers;
const Comments = db.comments;
const Users = db.users;
const Questions = db.questions;
const notifier = require('node-notifier');
const { schema_comments, schema_users } = require('../plugins/schemas');
const { model } = require('../Schemas/user.auth.model');
/** Get All Answers **/
exports.getAllAnswers = async function (req, res) {

    await Answers.find({})
        .exec(function (err, payload) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json(payload);

        });
};
/** Get Answer by its _id **/
exports.getAnswerByAnswerId = async function (req, res) {
    await Answers.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.aid) } },
        { $sort : { date : -1 } },
        {
            $project: {
                total_comments: { $size: "$comments" },
                upvotes: { $size: "$upvotes" },
                downvotes: { $size: "$downvotes" },
                message: "$message",
                date: "$date",
                questionid: "$questionId"

            }
            
        },
        {
            $lookup: {
                from: sc.schema_comments,
                localField: "_id",
                foreignField: "answerId",
                as: "comments"
            }
        },
    
    ]).exec(function (err, payload) {
            if (err) {
                return res.json({ status: res.statusCode, message: err.message });
            } else {
                return res.json(payload);
            }
        });
};
exports.getAnswerVotes = async function (req, res) {
    await Answers.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.aid) } },
        {
            $project: {
                upvotes: { $size: "$upvotes" },
                downvotes: { $size: "$downvotes" }

            }
        }])
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json(response);
        });
};
exports.getAnswerComments = async function (req, res) {
    await Answers.findOne({ _id: req.params.aid }).select('comments')
    .populate('by', sc.schema_users)
        .populate({ path: "comments", model: schema_comments })
        
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json(response);
        });
};
/** Get Answer by its Its question id **/
exports.getAnswersByQuestionId = async function (req, res) {
    await Answers.find(req.params.qid, function (err, payload) {
        if (err) {
            return res.json({ status: res.statusCode, message: err.message });
        }
        return res.json(payload);
    });
};

exports.commentOnQuestionAnswer = async function (req, res) {
    var comment = new Comments();
    await Answers.findOneAndUpdate(
        { _id: req.params.aid },
        { $push: { comments: comment._id } },
        function (error, response) {
            if (error) {
                res.json({
                    message: error.message,
                    path: error.path,

                });
            } else {
                comment.message = req.body.message;
                comment.by = req.body.userId;
                comment.answerId = req.params.aid;
                comment.save(function (err) {
                    if (err) {
                        return res.json({ status: res.statusCode, error: err.message });
                    }
                    res.json({
                        status: res.statusCode,
                        message: 'Commented ',
                        data: comment
                    });
                });
            }
        });

};

exports.upvoteAnswer = async function (req, res) {
    await Answers.findOneAndUpdate(
        { _id: req.params.answerId },
        { $addToSet: { 'answerVoters': req.body.userId } },
        { upsert: true }, function (err, response) {

            res.json({
                status: res.status,
                data: response
            });
        });

};

handlerError = function (error) {
    console.log(JSON.stringify({
        message: error.message,
        name: error.name,
        kind: error.kind,
        path: error.path,
        reason: error.reason,
        model: error.model
    }));
};