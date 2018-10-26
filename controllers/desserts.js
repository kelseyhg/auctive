// requirements
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');


// declare a new router
var router = express.Router();

// get login authorization helper
var loggedIn = require('../middleware/loggedIn');


// shows form to submit info about attendee dessert dash payment
router.get('/:id', loggedIn, function(req, res){
	db.event.findOne({
		where: {id: req.params.id},
		include: [db.attendee]
	})
	.then(function(foundEvent){
		res.render('dessert/index', {event: foundEvent});
		
	});	
});

// submits dessert dash payment info
router.put('/:id', function(req, res, next){
		var cash = 0;
		if(req.body.dessertPaid){
			cash = req.body.payment
		};
		db.attendee.update(
		{
			dessertDash: req.body.payment,
			dessertPaid: req.body.dessertPaid,
			cashPayment: cash,
			totalPaid: cash
   		}, 
		{returning: true, where: {bidNumber: req.body.bidNumber} }		
 	)
 	.then(function(updatedAttendee){
			req.flash('success', 'donation added');
    		res.send('cool');
		}).catch(function(err){
			req.flash('error', err.message);
			res.send('nope');
		}); 
});

	


module.exports = router;