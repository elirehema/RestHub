
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);
const config = require('../config/config');
const connection = {};
connection.connectMongoDatabase = function(){

  mongoose.set('bufferCommands', false);
    mongoose.connect(config.REMOTE_MONGO_URI, config.MONGOOSE_CONNECTION_OPTIONS, function(error, db){
        if(error){
          console.error("An Error has occured", error);
        }
        console.log("Connected to DataBase: "+ db.name);
      });
      mongoose.connection.on('error', err => {
        logError(err);
      });
      mongoose.connection.once('open', function () {
        console.log('OK');
      });
      mongoose.connection.on('close', () => {
        mongoose.connection.removeAllListeners();
    });

};

module.exports = connection;



