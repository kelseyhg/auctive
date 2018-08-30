$(".edit-call").submit(function(e){
	e.preventDefault();  //don't submit/send form
	console.log(this);
	var data = $(this).serialize();
	var url = $(this).attr('action');

	$.ajax({
		method: "PUT",
		url: url,
		data: data
	}).done(function(data){
		// console.log('success');
		 window.location = url;
	}).fail(function(err){
		console.log("Error", err);
	});  //end of ajax put

});

