function showForm() {
    var x = document.getElementById("hiddenForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function selectStatus(status) {
	 var element = document.getElementById("ticket");
    element.value = status;
}