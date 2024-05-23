// Function to update the clock every second
function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Format hours, minutes, and seconds with leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Display the time in the format HH:MM:SS
    var timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('clock').textContent = timeString;

    // Update the clock every second
    setTimeout(updateClock, 1000);
}

// Call the updateClock function to start updating the clock
updateClock();
