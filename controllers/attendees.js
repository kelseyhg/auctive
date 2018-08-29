
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
		include: [db.attendee]
	})
	.then(function(foundEvent){
		res.render('attendee/index', {event: foundEvent});
	});	
});

router.get('/edit/:id', loggedIn, function(req, res){
		db.attendee.findOne({
			where: {id: req.params.id},
		})
		.then(function(foundAttendee){	
		res.render('attendee/edit', {attendee: foundAttendee});
		});
	});

router.post('/', function(req, res){
	req.body.active = true;
	console.log(req.body);
	db.attendee.findOrCreate({
		where: {
			name: req.body.name,
			nameSecondary: req.body.nameSecondary,
			bidNumber: req.body.number,
			email: req.body.email,
			phone: req.body.phone,
			ticketStatus: req.body.ticket,
			table: req.body.table
		}
	})
	.spread(function(attendee, created){
		db.event.findOrCreate({
			where: {id: req.body.eventId}
		}).spread(function(event, found){
			attendee.addEvent(event).then(function(event){
				console.log(event, "added to", attendee);
			});
		});
	})
	.then(function(createdAttendee){
		req.flash('success');
    	res.redirect('/event');
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/');
	}); 
});

router.put('/:id', function(req, res, next){

		console.log("!!!!!!!!!!", req.body);
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
		req.flash('success');
    	res.redirect('/event');
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/');
	}); 
});



module.exports = router;