
// all edits pass through
$(".edit-call").submit(function(e){
	e.preventDefault();  //don't submit/send form
	console.log("00000000",this);
	var data = $(this).serialize();
	var url = $(this).attr('action');

	$.ajax({
		method: "PUT",
		url: url,
		data: data
	}).done(function(data){
		console.log('AJAX success');
		 window.location = url;
	}).fail(function(err){
		console.log("Error", err);
	});  //end of ajax put

});

// delete for items
$(".delete-call").submit(function(e){
	e.preventDefault();
	console.log("???????", this);
	var url = $(this).attr("action");
	var data = $(this).serialize();
	console.log("delete data", data)

	$.ajax({
		method: "DELETE",
		url: url,
		data: data
	}).done(function(data){
		window.location = url;
	}).fail(function(err){
		console.log("error!", error);
		});
	});
	
