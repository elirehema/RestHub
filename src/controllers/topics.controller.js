const db = require('../Schemas');
const Model  = db.topic;
const topicscontroller = {};

topicscontroller.funRetrieveAllTopics = async function(req, res){
    await Model.find({})
    .sort({created_at: -1})
    .populate('subjects')
    .populate('resources')
    .populate('questions')
    .exec(function (error, payload) {
        if (error) {
            res.json({ status: res.statusCode, message: error });
        }
        res.json(payload);
    });
};
topicscontroller.funCreateNewTopic = async function(req, res){
    var topic = new Model({
        name: req.body.name, code: req.body.code, 
        subjects: req.body.subjects, resources: req.body.resources,
        questions: req.body.questions, valid: req.body.valid});
    await topic.save(function (error) {
        if (error) { return res.json({ status: res.statusCode, error: error.message }); }
        return res.json(topic);
    });
};



module.exports = topicscontroller;