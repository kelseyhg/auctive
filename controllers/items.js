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

	


module.exports = router;