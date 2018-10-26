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
	db.purchase.findAll().then(function(allPurchases){
		db.event.findOne({
			where: {id: req.params.id},
			include: [db.purchase, db.attendee]
		})
	.then(function(foundEvent){
		res.render('makepurchase/index', {purchases: allPurchases, event: foundEvent});
		
	});	
});
});


router.post('/:id', function(req, res, next){
    req.body.active = true;
    purchases = [];
    purchaseId=req.body.purchaseId;
    db.attendee.findOne({
        where: {bidNumber: req.body.bidNumber }
    }).then(function(attendee){
        if(!attendee){
            return res.send('attendee not found');
        } else {
            attendeeId=attendee.id;
        }
    for(i=req.body.number; i>0; i--){
    	purchases.push({purchaseId, attendeeId})

    }
	    db.purchasesAttendees.bulkCreate(purchases)
    })
			
    .then(function(createdPurchaseInstance){
    	req.flash('success', 'purchase added');
    	res.redirect('/makepurchase/' + currentEvent.id);
    }).catch(function(err){
        req.flash('error', err.message);
        res.redirect('/');
    });
});


module.exports = router;