(($)=>{
    var timeoutInMiliseconds = 900000;
    var timeoutId; 


    function startTimer() { 
        // window.setTimeout returns an Id that can be used to start and stop a timer
        timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
    }

    function doInactive() {
        console.log("HRMS is inactive from last 15 mins, going to logout", site_url+"logout");
        // window.location.href = site_url+"logout";
    }

    function resetTimer() {     
        window.clearTimeout(timeoutId)
        startTimer();
    }

    function setupTimers () {
        document.addEventListener("mousemove", resetTimer, false);
        document.addEventListener("mousedown", resetTimer, false);
        document.addEventListener("keypress", resetTimer, false);
        document.addEventListener("touchmove", resetTimer, false);
        startTimer();
    }

    window.setupTimers = setupTimers;
})($);


$(document).ready(function(){
    setupTimers();
});