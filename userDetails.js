const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

// DB config
const DB_CONFIG = {
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
};

const MONGOOSE_CONNECT_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connecting Mongoose
mongoose.connect(`mongodb+srv://${DB_CONFIG.user}:${DB_CONFIG.password}@${DB_CONFIG.host}/${DB_CONFIG.database}`,
    MONGOOSE_CONNECT_CONFIG);

// Setting up the schema
const User = new mongoose.Schema({
    username: String,
    password: String,
});

// Setting up the passport plugin
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);