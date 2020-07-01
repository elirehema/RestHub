const UserModel = require('../Schemas').profiles;
const sc = require('../plugins/schemas');
exports.getProfilesList = async function (req, res) {
    await UserModel.find({})
    .populate({path:"tags", model: sc.schema_tags, select: "-_id -created_at -updated_at -__v" })
    .exec(function (err, payload) {
        if (err) {
            res.json({
                status: err.statusCode,
                message: err.message,
            });
        }
        res.json(payload);
    });
};
// Handle view user info
exports._getProfileById = async function (req, res) {
    await UserModel.findById(req.params.id, function (err, payload) {
        if (err) {
            return res.json({ status: res.statusCode, errror: err.message });
        } else
            if (null == payload) {
                return res.json({ status: res.statusCode, message: 'No Data available! ' });
            } else {
                res.json(payload);
            }
    });
};
// Handle update user info
exports._updateProfile = async function (req, res) {
    await UserModel.findById(req.params.id, function (err, user) {
        if (err) {
            return res.json({ status: res.statusCode, errror: err.message });
        } else
            if (null == user) {
                return res.json({ status: res.statusCode, message: 'No Data available! ' });
            } else {
                user.username = req.body.username ? req.body.username : user.username;
                user.fullname = req.body.fullname ? req.body.fullname : user.fullname;
                user.phone = req.body.phone ? req.body.phone : user.phone;
                user.thumbnail = req.body.ithumbnail ? req.body.ithumbnail : user.thumbnail;
                user.tags = req.body.tags ? req.body.tags : user.tags;
                user.address = req.body.address;
                user.city_state = req.body.city ? req.body.city : user.city;
                user.class = req.body.class ? req.body.class : user.class;

                user.save(function (err) {
                    if (err) {
                      return  res.json(err);
                    }
                    return res.json(user);
                });

            }

    });

};
// Handle delete user
exports.delete = async function (req, res) {
    await UserModel.remove({
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
