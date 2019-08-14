// Import User Model
UserAuth = require('../models/UserAuthSchema');
// Handle index Actions
var sess;
exports.index = function (req, res) {
    UserAuth.get(function (err, user_auths) {
        if (err) {
            res.json({
                status: 500,
                message: err.message,
            });
        }


        res.json({
            status: 200,
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
            return res.json({status: 201, error: err.message});
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
    UserAuth.findOne({username: req.body.username}, function (err, user) {
        if (err) {
            console.error('There was an error reading the file!', err);
        }
        if (user != null) {
            // test a matching password
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                if (req.body.password, isMatch) {
                    var hour = 3600000;
                    req.session.cookie.expires = new Date(Date.now() + hour)
                    req.session.cookie.maxAge = hour;
                    sess = req.session;
                    sess._id = user._id;
                    sess.username = req.body.username;
                    var tokenId = jwt.sign({id: user._id}, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    res.json({
                        auth: true,
                        status: 200,
                        session: sess,
                        message: 'Login Success',
                        data: req.body.username,
                        accessToken: tokenId
                    }); // -> Password123: true
                } else {
                    res.send('Wrong Username or Password');
                }
            });
        } else {
            res.json({
                auth: false,
                status: '404',
                message: 'Usename ' + req.body.username + '  Not Found',
                accessToken: null
            })
        }
    });


};
// Handle update user info
exports.update = function (req, res) {
    UserAuth.findById(req.params.user_id, function (err, user_auths) {
        if (err) {
            return res.json({status: 201, error: err.message});
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

exports.logout = (req, res) => {
    if (req.session.user && req.cookies.user_id) {
        res.clearCookie('user_sis');
        res.redirect('/')
        res.status(200).send({auth: false, token: null});
    } else {
        res.redirect('/');
    }
};

