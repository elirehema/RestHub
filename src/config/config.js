//config.js
module.exports = {
    'secret': 'supersecret',
    // 1. MongoDB
    REMOTE_MONGO_URI: process.env.LOCAL_MONGO_URI || 'mongodb+srv://read_write:password10071991@vue-shop-7qzhn.mongodb.net/test?retryWrites=true&w=majority',

    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

    // 3. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 8080,

    // 1. Local MongoDB
    LOCAL_MONGO_URI: process.env.LOCAL_MONGO_URI || 'mongodb://127.0.0.1/resthub',

    HOSTING_PORT: process.env.PORT || 8080,

    /**
     * Node development Eviroment**/
    DEVELOPER_ENVIROMENT: process.env.NODE_ENV || "development",

    /**Mongoose Connection Options **/
    /** Connect to Mongoose and set connection variable **/
    MONGOOSE_CONNECTION_OPTIONS: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        autoIndex: false, // Don't build indexes
        poolSize: 5, // Maintain up to 10 socket connections
        //loggerLevel: "debug",
        appname:"opusx",
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        //family: 4 // Use IPv4, skip trying IPv6
    }
};