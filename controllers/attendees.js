


router.get('/:id', loggedIn, function(req, res){
	db.event.findOne({
		where: {id: req.params.id},
		include: [db.attendee]
	})
	.then(function(foundEvent){
		res.render('attendee/index', {event: foundEvent});
		
	});	
});