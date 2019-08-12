// Import Message Model
Message = require('../models/messageModel');
// Handle index Actions

exports.index = function (req, res) {
    Message.get(function (err, message) {
        if (err) {
            res.json({
                status: 500,
                message: err,
            });
        }
        res.json({
            status: 200,
            message: "Message retrieved successfully",
            data: message
        });
    });
};
// Handle create message actions
exports.new = function (req, res) {
    var mes = new Message();
    mes.name = req.body.name;
    mes.message = req.body.message;

    // save the message and check for errors
    mes.save(function (err) {
        if (err) {
            return res.json({ status: 201, error: err.message });
        }
        res.json({
            status: 500,
            message: 'Message Sent!',
            data: mes
        });
    });
};
// Handle view Message info
exports.view = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {
        if (err) {
            return res.json({ status: 201, errror: err.message });
        } else
        if (null == message) {
            return res.json({ status: 200, message: 'No Data available! ' });
        } else {
            res.json({
                status: 202,
                message: 'Message loaded succesfully...',
                data: message
            });
        }
    });
};
// Handle update message info
exports.update = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {
        if (err) {
            return res.json({ status: 201, errror: err.message });
        }
        if (null == message) {
            return res.json({ status: 200, message: 'No Data available! ' });
        } else {

            message.name = req.body.name;
            message.message = req.body.message;

            message.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'message Info updated',
                    data: message
                });
            });
        }
    });
};
// Handle delete message
exports.delete = function (req, res) {
    Message.remove({
        _id: req.params.message_id
    }, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Message deleted'
        });
    });
};

