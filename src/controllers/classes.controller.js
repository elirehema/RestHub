const Model = require('../Schemas').classes;
exports.getAllClasses = async function (req, res) {
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
exports.createNewClass = async function (req, res) {
    var classes = new Model({ name: req.body.name, code: req.body.code });
    await classes.save(function (err) {
        if (err) {
            
            return res.json({
                message:"Duplicate Classname or CODE"
            });
        }
        return res.json(classes);
    });
};
exports.getClassById = async function (req, res) {
    await Model.findById(req.params.id, function (err, payload) {
        if (err) {
            return res.json({
                status: req.statusCode,
                message: 'No class with ID: ' + req.params.classId + 'found!'

            });
        }


        return res.json(payload);

    });
};
exports.updateClassById = async function (req, res) {
    await Model.findById(req.params.id, function (err, payload) {
        if (err) { res.send(err); }

        payload.name = req.body.name ? req.body.name : payload.name;
        payload.code = req.body.code ? req.body.code : payload.code;

        payload.save(function (err) {
            if (err) {
                return res.json(err);
            }

            res.json(payload);
        });
    });
};

exports.deleteClassById = async function (req, res) {
    await Model.deleteOne({
        _id: req.params.id
    }, function (err, payload) {
        if (err) {
            return res.json({
                status: res.statusCode,
                message: 'No class with id' + req.params.id
            });
        }

        return res.json({
            status: res.statusCode,
            message: 'Class deleted succesfully ...'
        });
    });
};