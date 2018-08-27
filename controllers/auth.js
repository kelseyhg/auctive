// requirements
var express = require('express');
var passport = require('../config/passportConfig');
var flash = require('connect-flash');

// include models
var db = require('../models');

// declare a new router
var router = express.Router();


router.use(express.static(__dirname + '/public/'));

// define routes
router.get('/login', function(req, res){
	res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash: 'log-in SUCCESS',
	failureRedirect: '/auth/login',
	failureFlash: 'log-in failed'
}));

router.get('/signup', function(req, res){
	res.render('auth/signup');
});

router.get('/newuser', function(req, res){
	res.render('auth/newuser');
});

router.post('/signup', function(req, res){
	console.log(req.body);
	req.body.admin = true;
	db.user.findOrCreate({
		where: { email: req.body.email },
		defaults: req.body
	}).spread(function(user, wasCreated){
		if(wasCreated) {
			passport.authenticate('local', {
				successRedirect: '/profile',
				successFlash: 'successfully logged in!',
				failureRedirect: '/',
				failureFlash: 'signup failed...'
			})(req, res);
		} else {
			
			res.redirect('/auth/login');
		}
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/auth/signup');
	});
	
});

router.post('/newuser', function(req, res){
	console.log(req.body);
	req.body.admin = false;
	db.user.findOrCreate({
		where: { userName: req.body.userName },
		defaults: req.body
	}).spread(function(user, wasCreated){
		if(wasCreated) {
			passport.authenticate('local', {
				successRedirect: '/profile',
				successFlash: 'new user added',
				failureRedirect: '/',
				failureFlash: 'new user failed'
			})(req, res);
		} else {
			
			res.redirect('/auth/login');
		}
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/auth/signup');
	});
	
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'successfully logged out!');
	res.redirect('/');
});

module.exports = router;


