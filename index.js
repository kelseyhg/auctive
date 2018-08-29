// require variables for dotenv
require('dotenv').config();

// require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require('express-session');

// declare app variables
var app = express();

// set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// custom middleware
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

//controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profiles'));
app.use('/event', require('./controllers/events'));
app.use('/item', require('./controllers/items'));
app.use('/donor', require('./controllers/donors'));
app.use('/attendee', require('./controllers/attendees'));

// define routes
app.get('/', function(req, res) {
	res.render('home');
});

// listen on port 3000
app.listen(3000, function(){
	console.log("You're listening to the smooth sounds of port 3000 in the morning.");
});