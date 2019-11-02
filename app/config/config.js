//config.js
module.exports = {
    'secret': 'supersecret',
    // 1. MongoDB
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://read_write:password10071991@vue-shop-7qzhn.mongodb.net/test?retryWrites=true&w=majority',

    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

    // 3. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 8080,

     // 1. Local MongoDB
    LOCAL_MONGO_URI: process.env.LOCAL_MONGO_URI || 'mongodb://127.0.0.1/resthub',

    HOSTING_PORT: process.env.PORT || 3338
};