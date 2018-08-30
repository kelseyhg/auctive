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
		include: [db.item, db.attendee]
	})
	.then(function(foundEvent){
		res.render('sell/index', {event: foundEvent});
		
	});	
});

router.put('/:id', function(req, res, next){
	console.log("!!!!!!!!!!", req.body);
	db.attendee.findOne({
		where: { bidNumber: req.body.bidNumber }
	}).then(function(attendee){
		if(!attendee){
			return res.send('attendee not found');
		}

		db.item.update(
			{ 
				soldPrice: req.body.soldPrice,
				attendeeId: attendee.id 
			}, 
			{ where: {number: req.body.itemNumber} } 
		).then(function(updatedItem){
			req.flash('success', 'success yay fun');
			res.send('yay');
		}).catch(function(err){
			req.flash('error', err.message);
			res.send('Oh no!', err);
		}); 

	}).catch(function(err){
		req.flash('error', err.message);
		res.send('Oh no!', err);
	});
	
});

router.get('/receipt/:id', loggedIn, function(req, res){
	db.event.findOne({
		where: {id: req.params.id},
		include: [db.item, db.attendee]
	})
	.then(function(foundEvent){
		res.render('sell/receipt', {event: foundEvent});
		
	});	
});

router.get('/show/:id', loggedIn, function(req, res){
	db.attendee.findOne({
		where: {id: req.params.id},
		include: [db.item]
	})
	.then(function(foundAttendee){
		db.item.findAll().then(function(foundItems){
			res.render('sell/show', {attendee: foundAttendee, item: foundItems});	
		});
		
	});	
});


module.exports = router;