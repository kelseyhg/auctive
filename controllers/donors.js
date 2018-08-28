// requirements
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');

// declare a new router
var router = express.Router();

// get login authorization helper
var loggedIn = require('../middleware/loggedIn');




router.get('/:id', loggedIn, function(req, res){
	db.event.findOne({
		where: {id: req.params.id},
		include: [db.donor]
	})
	.then(function(foundEvent){
		res.render('donor/index', {event: foundEvent});
		
	});	
});


router.post('/', function(req, res){
	req.body.active = true;
	console.log(req.body);
	db.donor.create(req.body)
	.spread(function(donor, created){
		db.event.findOrCreate ({
			where: {eventId: req.body.eventId}
		}).spread(function(event, found){
			donor.addEvent(event).then(function(event){
				console.log(event, "added to", donor);
			});
		});
	})
	.then(function(createdDonor){
			passport.authenticate('local', {
			successRedirect: '/event',
			successFlash: 'new donor added',
			failureRedirect: '/event',
			failureFlash: 'new donor failed'
		})(req, res);
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/');
	});
});


module.exports = router;