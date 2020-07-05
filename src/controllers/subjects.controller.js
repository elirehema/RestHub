const Model = require('../Schemas').subject;
const controller = {};
controller.getAllSubjects = async function (req, res) {
    await Model
        .find({})
        .exec(function (err, payload) {
            if (err) {
                return res.json({
                    statusCode: res.statusCode,
                    status: res.status,
                    message: err,
                });
            }
            return res.json(payload);
        });
};
controller.createNewSubject = async function (req, res) {
    var model = new Model({ name: req.body.name, code: req.body.code });
    model.save(function (err) {
        if (err) {
            return res.json({
                message: "Duplicate Subject name or CODE"
            });
        }
        return res.json(model);
    });
};
controller.getSubjectById = async function (req, res) {
    await Model.findById(req.params.id, function (error, payload) {
        if (error) { res.send(error); }
        res.json(payload);
    });
};
controller.updateSubject = async function (req, res) {
    await Model.findById(req.params.id, function (error, payload) {
        if (error) { res.send(error); }
        payload.name = req.body.name ? req.body.name : payload.name;
        payload.code = req.body.code ? req.body.code : payload.code;
        payload.valid = req.body.valid ? req.body.valid : payload.valid;
        payload.save(function (err) {
            if (err) {
                res.json({ message: "There was a duplicate key error" });
            } else {
                res.json(payload);
            }
        });
    });
};
controller.deleteSubject = async function (req, res) {
    await Model.deleteOne({ _id: req.params.id }, function (err, payload) {
        if (err) { return res.send(err); }
        return res.json({
            status: res.statusCode,
            message: 'Deleted succesfully'
        });
    });
};
module.exports = controller;