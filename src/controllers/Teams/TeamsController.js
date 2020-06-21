// Import TeamModel Model
Team = require('../../Schemas/Teams/teamsModel');
// Handle index Actions
exports.find = async function (req, res) {
    await Team.get(function (err, teams) {
        if (err) {
            res.json({
                status: res.statusCode,
                message: err,
            });
        }
        res.json({
            status: res.statusCode,
            message: "Team retrieved successfully",
            teams: teams
        });
    });
};
// 
exports.new = async function (req, res) {
    var team = new Team();
    team.team_id = req.body.team_id;
    team.name = req.body.name;
    team.code = req.body.code;
    team.country = req.body.country;
    team.logo = req.body.logo;
    team.founded = req.body.founded;
    team.venue_surface = req.body.venue_surface;
    team.venue_name = req.body.venue_name;
    team.venue_address = req.body.venue_address;
    team.venue_city = req.body.venue_city;
    team.venue_capacity = req.body.venue_capacity;

    
    await team.save(function (err) {
        if (err) {
            return res.json({
                status: res.statusCode,
                error: err.message });
        }
        res.json({
            status: res.statusCode,
            message: 'New Team created succesfully!',
            data: team
        });
    });
};

/**Handle FINDBY ID operation**/
exports.view = async function (req, res) {
    await Team.findById(req.params.team_id, function (err, team) {
        if (err) {
            return res.json({ status: res.statusCode, errror: err.message });
        } else
            if (null == team) {
                return res.json({ status: res.statusCode, message: 'No Data available! ' });
            } else {
                res.json({
                    status: res.statusCode,
                    message: 'Team details loaded succesfully...',
                    data: team
                });
            }
    });
};

/**
 **Handle UPDATE Operations**/

exports.update = async function (req, res) {
    await Team.findById(req.params.team_id, function (err, team) {
        if (err) {
            return res.json({ 
                status: res.statusCode,
                 errror: err.message });
        }
        team.team_id = req.body.team_id;
        team.name = req.body.name;
        team.code = req.body.code;
        team.country = req.body.country;
        team.logo = req.body.logo;
        team.founded = req.body.founded;
        team.venue_surface = req.body.venue_surface;
        team.venue_name = req.body.venue_name;
        team.venue_address = req.body.venue_address;
        team.venue_city = req.body.venue_city;
        team.venue_capacity = req.body.venue_capacity;

        team.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: res.statusCode,
                message: 'Updated Successfully...',
                data: team
            });
        });

    });
};
/**Handle DELETE Operations **/
exports.delete = async function (req, res) {
    await Team.remove({
        _id: req.params.team_id
    }, function (err, team) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'Deleted Successfully ...'
        });
    });
};

