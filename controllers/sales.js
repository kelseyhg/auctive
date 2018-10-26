// requirements
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');


// declare a new router
var router = express.Router();

// get login authorization helper
var loggedIn = require('../middleware/loggedIn');


// shows form to submit info about item and its winning bidder/bid
router.get('/:id', loggedIn, function(req, res){
	db.event.findOne({
		where: {id: req.params.id},
		include: [db.item, db.attendee]
	})
	.then(function(foundEvent){
		res.render('sell/index', {event: foundEvent});
		
	});	
});

// submits item and winning bidder/bid info
router.put('/:id', function(req, res, next){
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
			req.flash('success', 'winner added');
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

// list of attendees with check-out buttons to take them to payment info/receipt
router.get('/receipt/:id', loggedIn, function(req, res){
	db.event.findOne({
		where: {id: req.params.id},
		include: [ db.item, db.attendee ], order: [ [ db.attendee, 'bidNumber', 'ASC' ] ]
	})
	.then(function(foundEvent){
		res.render('sell/receipt', {event: foundEvent});
		
	});	
});

// shows receipt page where user can enter payment info and set paid to true
router.get('/show/:id', loggedIn, function(req, res){
	db.attendee.findOne({
		where: {id: req.params.id},
		include: [db.item, db.purchase]
	})
	.then(function(foundAttendee){
		db.item.findAll().then(function(foundItems){
			res.render('sell/show', {attendee: foundAttendee, item: foundItems});	
		});
		
	});	
});

// submits info about bidder payment and payment completion
router.put('/show/:id', function(req,res, next){
	total = req.body.card + req.body.cash
	db.attendee.update(
	{
		cardPayment: req.body.card,
		cashPayment: req.body.cash,
		paid: req.body.paid,
		totalPaid: total
	},
	{ where: {id: req.body.id} }
	).then(function(updatedItem){
			req.flash('success', 'payment posted');
			res.send('yay');
		}).catch(function(err){
			req.flash('error', err.message);
			res.send(err, 'this is not good');
		});
});


module.exports = router;