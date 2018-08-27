// require modules
var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;

//declare variables
var db = require('../models');

//provide serialize/deserialize functions for sessions
passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	db.user.findById(id).then(function(user) {
	callback(null, user);
		
	}).catch(function(err){
		callback(err, null);
	});
});

// actually log in a user
passport.use(new passportLocalStrategy({
	usernameField: 'userName',
	passwordField: 'password',
}, function(userName, password, callback){
	db.user.findOne({
		where: {userName: userName }
	}).then(function(foundUser){
		if(!foundUser || !foundUser.isValidPassword(password)){
			callback(null, null)
		}
		else {
			callback(null, foundUser);
		}
	}).catch(function(err){
		callback(err, null);
	})
}));


module.exports = passport;