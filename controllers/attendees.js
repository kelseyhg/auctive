
// requirements
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');

// declare a new router
var router = express.Router();

// get login authorization helper
var loggedIn = require('../middleware/loggedIn');

// show attendees for current event
router.get('/:id', loggedIn, function(req, res){
	db.event.findOne({
		where: {id: req.params.id},
		include: [db.attendee]
	})
	.then(function(foundEvent){
		res.render('attendee/index', {event: foundEvent});
	});	
});

// get edit attendee form
router.get('/edit/:id', loggedIn, function(req, res){
	db.attendee.findOne({
		where: {id: req.params.id},
	})
	.then(function(foundAttendee){	
		res.render('attendee/edit', {attendee: foundAttendee, eventId: currentEvent.id});
	});
});

// add new attendee
router.post('/', function(req, res){
	req.body.active = true;
	db.attendee.findOrCreate({
		where: {
			name: req.body.name,
			nameSecondary: req.body.nameSecondary,
			bidNumber: req.body.number,
			email: req.body.email,
			phone: req.body.phone,
			ticketStatus: req.body.ticket,
			table: req.body.table,
			paid: false
		}
	})
	.spread(function(attendee, created){
		db.event.findOrCreate({
			where: {id: req.body.eventId}
		}).spread(function(event, found){
			attendee.addEvent(event).then(function(event){
			});
		});
	})
	.then(function(createdAttendee){
		req.flash('success');
    	res.redirect('/attendee/' + req.body.eventId);
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/');
	}); 
});

// edit attendee info
router.put('/:id', function(req, res, next){
		db.attendee.update(
		{
			name: req.body.name,
   			nameSecondary: req.body.nameSecondary,
   			phone: req.body.phone,
   			email: req.body.email,
   			ticket: req.body.ticket,
   			table: req.body.table
   		}, 
		{returning: true, where: {id: req.body.id} }		
 	)
 	.then(function(updatedAttendee){
			req.flash('success', 'item updated');
    		res.send('cool');
		}).catch(function(err){
			req.flash('error', err.message);
			res.send('nope');
		}); 
});



module.exports = router;