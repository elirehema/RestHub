// Import express
const express = require('express');
// Import Body parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
// Initialize the app
let app = express();
var cors = require('cors');
app.use(cors());
// Import routes
let apiRoutes = require("./app/routes/api-routes");
let productRoutes = require("./app/routes/product-routes");
let userRoutes = require("./app/routes/user-routes");
let auths = require("./app/routes/user-auth-routes")


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });
var db = mongoose.connection;
//db 
db.on('error', console.error.bind(console, 'DB connection error!'));
db.on('open', function(){
    console.log('Database Connection successfully!');
});



// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello RestHub'));
// Use Api routes in the App
app.use('/api', apiRoutes);
app.use('/api',productRoutes);
app.use('/api', userRoutes);
app.use('/api', auths);


// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});