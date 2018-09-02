// requirements
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');
var async = require('async');

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


router.get('/edit/:id', loggedIn, function(req, res){
		db.donor.findOne({
			where: {id: req.params.id},
		})
		.then(function(foundDonor){	
		res.render('donor/edit', {donor: foundDonor});
		});
	});


router.post('/', function(req, res){
	req.body.active = true;
	console.log(req.body);
	db.donor.findOrCreate({
		where: {
			name: req.body.name,
			contactName: req.body.contactName,
			email: req.body.email,
			phone: req.body.phone,
			notes: req.body.notes
		}
	})
	.spread(function(donor, created){
		db.event.findOrCreate({
			where: {id: req.body.eventId}
		}).spread(function(event, found){
			donor.addEvent(event).then(function(event){
				console.log(event, "added to", donor);
			});
		});
	})
	.then(function(createdDonor){
		req.flash('success');
    	res.redirect('/donor/' + req.body.eventId);
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/');
	}); 
});


router.put('/:id', function(req, res, next){

		console.log("!!!!!!!!!!", req.body);
		db.donor.update(
		{
			name: req.body.name,
   			contactName: req.body.contactName,
   			phone: req.body.phone,
   			email: req.body.email,
   			notes: req.body.notes
   		}, 
		{returning: true, where: {id: req.body.id} }
		
 )
 .then(function(updatedDonor){
		req.flash('success');
    	res.redirect('/event');
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/');
	}); 
});


router.delete("/:id", loggedIn, function(req, res){
	db.donor.findOne({
		where: {id: req.body.kitten},
		include: [db.event]
	}).then(function(foundDonor){
		console.log(foundDonor.name);
		async.forEach(foundDonor.events, function(a, done){
			foundDonor.removeEvent(a).then(function(){done();})
		}, function(){
			db.donor.destroy({
				where: {id: req.body.kitten}
			}).then(function(){
				res.send("delete may have worked")
			}).catch(function(err){
				res.status(500).send("not working....")
			});
			});
	
		});
});














module.exports = router;