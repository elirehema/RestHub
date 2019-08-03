// Import User Model
UserAuth = require('../models/UserAuthSchema');
// Handle index Actions
var sess;
exports.index = function (req, res) {
    UserAuth.get(function (err, user_auths) {
        if (err) {
            res.json({
                status: "error",
                message: err.message,
            });
        }
        res.json({
            status: "success",
            message: "User retrieved successfully",
            data: user_auths
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new UserAuth();
    user.username = req.body.username;
    user.password = req.body.password;

    // save the user and check for errors
    user.save(function (err, user_auths) {
        if (err) {
            return res.json({ status: 201, error: err.message });
        }
        res.json({
            status: 200,
            message: 'Saved succesfully',
            data: user_auths
        });

    });
};
// Handle view user info
exports.view = function (req, res) {
    UserAuth.findOne({ username: req.body.username }, function (err, user) {
        if (err) { console.error('There was an error reading the file!', err); }
        if (user != null) {
            // test a matching password
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                if (req.body.password, isMatch) {
                    var hour = 3600000
                    req.session.cookie.expires = new Date(Date.now() + hour)
                    req.session.cookie.maxAge = hour
                    sess = req.session;
                    sess.username = req.body.username;
                    res.json({
                        status: 200,
                        session: sess,
                        message: 'Welcome : ' + req.body.username
                    }); // -> Password123: true
                } else {
                    res.send('Wrong Username or Password');
                }
            });
        } else {
            res.json({
                status: '404',
                message: 'Usename ' + req.body.username + '  Not Found'
            })
        }
    });

    /*UserAuth.findById(req.params.id, function (err, user_auths) {
        if (err) {
            return res.json({ status: 201, errror: err.message });
        } else
            if (null == user_auths) {
                return res.json({ status: 200, message: 'No Data available! ' });
            } else {
                res.json({
                    status: 202,
                    message: 'User details loaded succesfully...',
                    data: user_auths
                });
            }
    });*/
};
// Handle update user info
exports.update = function (req, res) {
    UserAuth.findById(req.params.user_id, function (err, user_auths) {
        if (err) {
            return res.json({ status: 201, error: err.message });
        }

        user_auths.username = req.body.username;
        user_auths.password = req.body.password;
        // save the user and check for errors
        user_auths.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user_auths
            });
        });

    });
};
// Handle delete user
exports.delete = function (req, res) {
    UserAuth.remove({
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

