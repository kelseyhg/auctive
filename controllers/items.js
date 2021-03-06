// requirements
var express = require('express');
var db = require('../models');
var passport = require('../config/passportConfig');


// declare a new router
var router = express.Router();

// get login authorization helper
var loggedIn = require('../middleware/loggedIn');

// get items list/new item form for a given event id
router.get('/:id', loggedIn, function(req, res){
	db.donor.findAll().then(function(allDonors){
		db.event.findOne({
			where: {id: req.params.id},
			include: [ db.item ], order: [ [ db.item, 'number', 'ASC' ] ]
		})
		.then(function(foundEvent){	
		res.render('item/index', {donors: allDonors, event: foundEvent});
		});
	});
});

// add new item
router.post('/', function(req, res, next){
    req.body.active = true;
    db.item.create(req.body)
    .then(function(createdItem){
    	req.flash('success', 'item added');
    	res.redirect('/item/' + req.body.eventId);
    }).catch(function(err){
        req.flash('error', err.message);
        res.redirect('/');
    });
});

// get edit page for a given item
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

// update item information	
router.put('/:id', function(req, res, next){
	db.item.update(
		{
		number: req.body.number,
		name: req.body.name,
   		type: req.body.type,
   		description: req.body.description,
   		marketPrice: req.body.marketPrice,
   		soldPrice: req.body.soldPrice,
   		attendeeId: req.body.attendeeId
   		}, 
		{returning: true, where: {id: req.body.id} }		
 )
 .then(function(updatedItem){
		req.flash('success', 'item updated');
    	res.send('cool');
	}).catch(function(err){
		req.flash('error', err.message);
		res.send('nope');
	}); 
});


// delete item record
router.delete("/:id", loggedIn, function(req, res){
	db.item.destroy({
		where: {id: req.body.kitten}
	}).then(function(justDestroyed){
		res.send("successfully deleted");
	}).catch(function(error){
		res.send("yikes");
	});
});



module.exports = router;