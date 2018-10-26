// requirements
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');

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
	itemRange = req.body.iRange;
	attendeeRange = req.body.aRange;
	db.event.findOrCreate({
		where: { name: req.body.eventName },
		defaults: req.body
	}).spread(function(event, wasCreated){
		res.redirect('/event');
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/event/show', { event: event });
	});
	
});


router.get("/:name", loggedIn, function(req, res) {
	db.event.findOne({
		where: {name: req.params.name},
	}).then(function(foundEvent){
		currentEvent = foundEvent;
		res.render("event/show", {event: foundEvent});
	}).catch(function(err){
    console.log(err);
    res.send('oops');
});
   
});

router.get('/areport/:id', loggedIn, function(req, res){
	db.attendee.findAll({
		  order: [
            ['bidNumber', 'ASC'],
        ],
		}).then(function(allAttendees){
		db.event.findOne({
		where: {id: req.params.id},
		include: [db.item, db.purchase]	
	}).then(function(foundEvent){
		db.item.findAll({
			where: { eventId: req.params.id },
			}).then(function(allItems){
		res.render('event/areport', {attendee: allAttendees, event: foundEvent, item: allItems});	
		});
	}); 
	});
});


router.get('/ireport/:id', loggedIn, function(req, res){
	db.attendee.findAll().then(function(allAttendees){
		db.event.findOne({
		where: {id: req.params.id},
		include: [ db.item ], order: [ [ db.item, 'number', 'ASC' ] ]	
	}).then(function(foundEvent){
		db.item.findAll({
			where: { eventId: req.params.id },
			}).then(function(allItems){
		res.render('event/ireport', {attendee: allAttendees, event: foundEvent, item: allItems});	
		});
	}); 
	});
});


module.exports = router;