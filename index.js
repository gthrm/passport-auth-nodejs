// Requiring Modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./userDetails');
const routes = require('./routes/router');
require('dotenv').config();
const app = express();

// set up view engine and layout
app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Set up session
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(routes);

const PORT = process.env.PORT || 3000;

// Set up express server
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${server.address().port}`);
});

// UserDetails.register({ username: 'nemo', active: false }, '123');
