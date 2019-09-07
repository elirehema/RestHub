// Import express
"use strict";
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

// Notify using the built-in convenience method
const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7 // 1 week
});

if (notifier.update) {
    console.log(`Update available: ${notifier.update.latest}`);
}

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const session = require('express-session');
const config = require('./app/config/config');

// Import routes
let apiRoutes = require("./app/routes/cont-routes");
let productRoutes = require("./app/routes/product-routes");
let userRoutes = require("./app/routes/user-routes");
let auths = require("./app/routes/user-auth-routes");
let messageRoute = require("./app/routes/msg-routes");

const app = express();
var cors = require('cors');

var sess = {
    secret: 'fdsakhfdsjabgidshngaerniaerpbeijdskagkgsakjnk',
    cookie: {
        resave: false,
        saveUninitialized: true,
        maxAge  : 24*60*60*1000,
        secure: true,
        expires: 0
    }
};
if (app.get('env') === 'production') {
    app.use(function(req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });

    app.set('trust proxy', 1);// trust first proxy
    sess.cookie.secure = true // serve secure cookies
}


app.use(session(sess));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', auths);
app.use('/api', messageRoute);

app.get('/', function(req, res){
        res.send('RestHub api started...');
        let sess = req.session;
        if(sess.username && sess.id) {
            return res.redirect('/');
        }
        return res.redirect('/login');
    });


// Connect to Mongoose and set connection variable
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};


mongoose.connect(config.MONGO_URI, options)
    .catch(error => handleError(error));

//Handle db connection errors
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error!'));
db.on('open', function () {
    console.log('Database Connection successfully!');
});



// Launch app to listen to specified port
const server = app.listen(config.LISTEN_PORT, function () {
    console.log("Running RestHub on port " + config.LISTEN_PORT);
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    //console.log(socket.id);
    socket.on('SEND_MESSAGE', function (data) {
        io.emit('MESSAGE', data)
    });
});

module.exports = server;
