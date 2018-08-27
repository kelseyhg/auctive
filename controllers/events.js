// requirements
var express = require('express');
var db = require('../models');

// declare a new router
var router = express.Router();

// get login authorization helper
var loggedIn = require('../middleware/loggedIn');

// define routes
router.get('/', loggedIn, function(req, res){
	db.event.findAll({
		where: { userId: req.user.id }
	}).then(function(events){
		res.render('event/index', { events: events });

	}).catch(function(err){
		console.log(err);
		res.send('event-free, i guess??');
	})
});


router.post('/', function(req, res){
	req.body.active = true;
	console.log(req.body);
	db.event.findOrCreate({
		where: { name: req.body.eventName },
		defaults: req.body

	}).spread(function(event, wasCreated){
		if(wasCreated) {
			passport.authenticate('local', {
				successRedirect: '/event/' + wasCreated.id,
				successFlash: 'new event added',
				failureRedirect: '/profile/',
				failureFlash: 'new event failed'
			})(req, res);
		} else {
			
			res.redirect('event');
		}
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/event/');
	});
	
});


router.get("/:name", loggedIn, function(req, res) {
	db.event.findOne({
		where: {name: req.params.name},
	}).then(function(foundEvent){
		res.render("event/show", {event: foundEvent});
	}).catch(function(err){
    console.log(err);
    res.send('oops');
});
   
});


module.exports = router;