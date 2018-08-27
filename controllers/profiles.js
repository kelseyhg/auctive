// requirements
var express = require('express');
var db = require('../models');

// declare a new router
var router = express.Router();

// get login authorization helper
var loggedIn = require('../middleware/loggedIn');

// define routes
router.get('/', loggedIn, function(req, res){
	res.render('profile/index');
});


router.get('/newuser', function(req, res){
	res.render('profile/newuser');
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
			
			res.redirect('profile/index');
		}
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('profile/index');
	});
	
});



module.exports = router;
