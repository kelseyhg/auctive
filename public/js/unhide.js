
// reveal and re-hide forms with hiddenForm id
// PROBLEM: requires two clicks for first reveal, idk why
function showForm() {
    var x = document.getElementById("hiddenForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}



