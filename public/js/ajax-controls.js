$(document).ready(function() {
 console.log('Hello from ajax.js!');
});

$(".edit-call").submit(function(e){
		e.preventDefault();  //don't submit/send form
	console.log(this);
		var url = $(this).attr("action");
		var data = $(this).serialize();
		console.log("url:", url);
		console.log("data:", data);

		$.ajax({
			method: "PUT",
			url: url,
			data: data

	}).done(function(data){
		 window.location = "event";
	}).fail(function(err){
		console.log("Error", err);
		});  //end of ajax put

});