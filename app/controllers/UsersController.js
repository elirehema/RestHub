// Import User Model
User = require('../models/User');
// Handle index Actions

exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "User retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new User({
    UserID:req.body.userid,
    UserInfo:{Username :req.body.username}

});

    // save the user and check for errors
    user.save(function (err) {
        if (err) {
            return res.json({ status: 201, error: err.message });
        }
        res.json({
            status: 500,
            message: 'New User created succesfully!',
            data: user
        });
    });
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            return res.json({ status: 201, errror: err.message });
        } else
            if (null == user) {
                return res.json({ status: 200, message: 'No Data available! ' });
            } else {
                res.json({
                    status: 202,
                    message: 'User details loaded succesfully...',
                    data: user
                });
            }
    });
};
// Handle update user info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            return res.json({ status: 201, errror: err.message });
        }
        if (null == user) {
            return res.json({ status: 200, message: 'No Data available! ' });
        } else {
            
            user.username = req.body.username;
            user.fname = req.body.fname ? req.body.fname : user.fname;
            user.lname = req.body.lname;
            user.phone = req.body.phone;
            user.image = req.body.image;
            user.email = req.body.email;
            user.fullname = user.getFullName();
            // save the user and check for errors
            user.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'User Info updated',
                    data: user
                });
            });
        } 
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};

