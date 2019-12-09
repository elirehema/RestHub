// Import express
"use strict";
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const user_docs = require('./docs/user.json');
const product_docs = require('./docs/products.json');
const auth_docs = require('./docs/auth.json');
const contact_docs = require('./docs/contact.json');

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
var validate = require("validate-npm-package-name");
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");



// Import routes
let apiRoutes = require("./app/routes/cont-routes");
let productRoutes = require("./app/routes/product-routes");
let userRoutes = require("./app/routes/user-routes");
let auths = require("./app/routes/user-auth-routes");
let messageRoute = require("./app/routes/msg-routes");
let teamRoutes = require("./app/routes/team-routes");
let classRoutes = require("./app/routes/classes-routes");

const app = express();

const swaggerUi = require('swagger-ui-express');

const sptions = {
    explorer: true,
    swaggerOptions:{
      urls:[
        {
            url: '/api-doc/auth',
            name: 'Authentication'
        },
        {
            url: '/api-doc/user',
            name: 'Users'
        },
        {
            url: '/api-doc/products',
            name: 'Products'
        },
        {
            url: '/api-doc/contacts',
            name: 'Contacts'
        },
        
       
      ]
    }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, sptions));


var cors = require('cors');

var sess = {
    secret: 'fdsakhfdsjabgidshngaerniaerpbeijdskagkgsakjnk',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        expires: 0
    },

    resave: false,
    saveUninitialized: true,
};
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });

    app.set('trust proxy', 1);// trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', apiRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', auths);
app.use('/api/v1', messageRoute);
app.use('/api/v1', classRoutes);
app.use('/api/v1/teams', teamRoutes);




/** 
 * Create api user sessions
 * `req` is an http.IncomingMessage, which is a Readable Stream
 * `res` is an http.ServerResponse, which is a Writable Stream
 * **/


app.get('/', function (req, res) {
    res.send('RestHub api started...');
    let sess = req.session;
    if (sess.username && sess.id) {
        return res.redirect('/');
    }
    /**
     * Disabled for headers**/
   // return res.redirect('/login');
});

app.get('/api-doc/user', function(req, res){
    return res.json(user_docs);
});
app.get('/api-doc/products', function(req, res){
    return res.json(product_docs);
});
app.get('/api-doc/auth', function(req, res){
    return res.json(auth_docs);
});
app.get('/api-doc/contacts', function(req, res){
    return res.json(contact_docs);
});


/**
 *   Connect to Mongoose and set connection variable 
 * */
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};


 mongoose.connect(config.REMOTE_MONGO_URI, options)
    .then(()=> console.log("Connected to DataBase..."))
    .catch(err => console.error("An Error has occured", err))

var db = mongoose.connection;
db.on('open', function () {
    console.log('OK');
});



/** 
 *  Launch app to listen to specified port
**/
const server = app.listen(config.HOSTING_PORT, function () {
    console.log("Running RestHub on port " + config.HOSTING_PORT);
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    //console.log(socket.id);
    socket.on('SEND_MESSAGE', function (data) {
        io.emit('MESSAGE', data)
    });
});
/**
 * Export server for other external modules
 * **/
module.exports = server;
