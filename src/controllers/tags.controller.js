const Model = require('../Schemas').tags;

const controller = {};

controller.getAllTags = async function (req, res) {
    await Model.find()
        .exec(function (error, payload) {
            if (error) {
                res.json({ status: res.statusCode, message: err });
            }
            res.json(payload);
        });
};
// Handle create product actions
controller.createNewTag = async function (req, res) {
    var tag = new Model({ name: req.body.name, valid: false });
    tag.save(function (error) {
        if (error) { return res.json({ status: res.statusCode, error: error.message }); }
        res.json(tag);
    });
};
// Handle view product info
controller.getTagByTagId = async function (req, res) {
    await Model.findById(req.params.id, function (error, payload) {
        if (error) { res.send(error.message); }
        res.json(payload);
    });
};


controller.updateTagByTagId = async function (req, res) {
    await Model.findById(req.params.id, function (error, payload) {
        if (error) { res.send(error); }
        payload.name = req.body.name ? req.body.name : payload.name;
        payload.valid = req.body.valid ? req.body.valid : payload.valid;
        payload.save(function (err) {
            if (err) {
                res.json({message: "There was a duplicate key error"});
            } else {

                res.json(payload);
            }
        });
    });
};

// Delete
controller.deleteTag = async function (req, res) {
    await Model.deleteOne({_id: req.params.id}, function (err, product) {
        if (err) { res.send(err); }
        res.json({
            status: res.statusCode,
            message: 'Product deleted'
        });
    });
};

module.exports = controller;