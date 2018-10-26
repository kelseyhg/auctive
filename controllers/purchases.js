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
		db.event.findOne({
			where: {id: req.params.id},
			include: [db.purchase]
		})
		.then(function(foundEvent){	
		res.render('purchases/index', {event: foundEvent});
		});
});

// add new item
router.post('/', function(req, res, next){
    req.body.active = true;
    db.purchase.create(req.body)
    .then(function(createdPurchase){
    	req.flash('success', 'added');
    	res.redirect('/purchase/' + req.body.eventId);
    }).catch(function(err){
        req.flash('error', err.message);
        res.redirect('/');
    });
});

// delete item record
router.delete("/:id", loggedIn, function(req, res){
	db.purchase.destroy({
		where: {id: req.body.kitten}
	}).then(function(justDestroyed){
		res.send("successfully deleted");
	}).catch(function(error){
		res.send("yikes");
	});
});



module.exports = router;