var graduationDate = new Date("May 8, 2025 15:00:00").getTime();

var x = setInterval(function(){
    var now = new Date().getTime();

    var distance = graduationDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(distance / (1000 * 60 * 60)) % 24;
    var mins = Math.floor(distance / (1000 * 60)) % 60;
    var secs = Math.floor(distance / (1000)) % 60;

    if(hours < 10){
        hours = "0" + hours;
    }

    if(mins < 10){
        mins = "0" + mins;
    }

    if(secs < 10){
        secs = "0" + secs;
    }

    document.getElementById("countdown").innerHTML = days + ":" + hours + ":" + mins + ":" + secs;

    if(distance <= 0){
        document.getElementById("countdown").innerHTML = "GO TIGERS!";
    }
}, 1000);