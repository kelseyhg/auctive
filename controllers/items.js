// requirements
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');

// declare a new router
var router = express.Router();

// get login authorization helper
var loggedIn = require('../middleware/loggedIn');


router.get('/:id', loggedIn, function(req, res){
	db.donor.findAll().then(function(allDonors){
		db.event.findOne({
			where: {id: req.params.id},
			include: [db.item]
		})
		.then(function(foundEvent){	
		res.render('item/index', {donors: allDonors, event: foundEvent});
		});
	});
});

router.post('/', function(req, res, next){
    req.body.active = true;
    console.log(req.body);
    db.item.create(req.body)
    .then(function(createdItem){
    	req.flash('success', 'wheee');
    	res.redirect('/event');
    }).catch(function(err){
        req.flash('error', err.message);
        res.redirect('/');
    });
});

router.get('/edit/:id', loggedIn, function(req, res){
	db.donor.findAll().then(function(allDonors){
		db.item.findOne({
			where: {id: req.params.id},
		})
		.then(function(foundItem){	
		res.render('item/edit', {donors: allDonors, item: foundItem});
		});
	});
});
	
router.put('/:id', function(req, res, next){

		console.log("!!!!!!!!!!", req.body);
		db.item.update(
		{
			name: req.body.name,
   			type: req.body.type,
   			description: req.body.description,
   			marketPrice: req.body.marketPrice,
   			soldPrice: req.body.soldPrice,
   			attendeeId: req.body.attendeeId
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