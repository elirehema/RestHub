// Import User Model
User = require('../Schemas/UserModel');
// Handle index Actions

exports.index = async function (req, res) {
   await  User.get(function (err, users) {
        if (err) {
            res.json({
                status: res.statusCode,
                message: err,
            });
        }
        res.json({
            status: res.statusCode,
            message: "User retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = async function (req, res) {
    var user = new User();
    user._id = req.body.id;
    user.username = req.body.username;
    user.fname = req.body.fname ? req.body.fname : user.fname;
    user.lname = req.body.lname;
    user.phone = req.body.phone;
    user.image = req.body.image;
    user.email = req.body.email;
    user.address = req.body.address;
    user.city = req.body.city;
    user.postal = req.body.postal;
    user.country = req.body.country;
    user.fullname = user.getFullName();

    // save the user and check for errors
    await user.save(function (err) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
        }
        res.json({
            status: res.statusCode,
            message: 'New User created succesfully!',
            data: user
        });
    });
};
// Handle view user info
exports.view = async function (req, res) {
    await User.findById(req.params.user_id, function (err, user) {
        if (err) {
            return res.json({ status: res.statusCode, errror: err.message });
        } else
            if (null == user) {
                return res.json({ status: res.statusCode, message: 'No Data available! ' });
            } else {
                res.json({
                    status: res.statusCode,
                    message: 'User details loaded succesfully...',
                    data: user
                });
            }
    });
};
// Handle update user info
exports.update = async  function (req, res) {
    await User.findById(req.params.user_id, function (err, user) {
        if (err) {
            return res.json({ status: res.statusCode, errror: err.message });
        }
            user.username = req.body.username;
            user.fname = req.body.fname ? req.body.fname : user.fname;
            user.lname = req.body.lname;
            user.phone = req.body.phone;
            user.image = req.body.image;
            user.email = req.body.email;
            user.address = req.body.address;
            user.city = req.body.city;
            user.postal = req.body.postal;
            user.country = req.body.country;
            user.fullname = user.getFullName();
            // save the user and check for errors
            user.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    status: res.statusCode,
                    message: 'User Info updated',
                    data: user
                });
            });
        
    });
};
// Handle delete user
exports.delete = async  function (req, res) {
   await User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'User deleted'
        });
    });
};
