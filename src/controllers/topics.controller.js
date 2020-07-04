const { request } = require('http');

const Model = require('../Schemas').topic;
const controller = {};

controller.funRetrieveAllTopics = async function(req, res){
    await Model.find({})
    .exec(function (error, payload) {
        if (error) {
            res.json({ status: res.statusCode, message: error });
        }
        res.json(payload);
    });
};
controller.funCreateNewTopic = async function(req, res){
    var topic = new Model({name: req.body.name, code: req.body.code});
    await topic.save(function (error) {
        
        if (error) { return res.json({ status: res.statusCode, error: error.message }); }
        return res.json(topic);
    });
};



module.exports = controller;