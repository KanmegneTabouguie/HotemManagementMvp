$(document).ready(function() {
    // Handle form submission for creating a new room
    $('#createRoomForm').on('submit', function(event) {
        event.preventDefault();

        // Get form values
        const roomNumber = $('#roomNumber').val();
        const roomType = $('#roomType').val();
        const pricePerNight = $('#pricePerNight').val();
        const availability = $('#availability').prop('checked');
        const roomImage = $('#roomImage').val();

        // Prepare data for the new room
        const newRoomData = {
            room_number: roomNumber,
            type: roomType,
            price_per_night: parseFloat(pricePerNight),
            availability: availability,
            image: roomImage
        };

        // Fetch the session token and user role from local storage
        const token = localStorage.getItem('sessionToken');
        const userRole = localStorage.getItem('userRole');

        // Check if token and user role are available
        if (!token || !userRole) {
            // If any of the required items are missing, redirect to login
            window.location.href = 'login.html';
            return;
        }

        // Send a POST request to create a new room
        $.ajax({
            url: 'http://localhost:3067/rooms',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            data: JSON.stringify(newRoomData), // Convert data to JSON format
            success: function(response) {
                // Handle success response
                console.log('New room created:', response);
                alert('New room created successfully!');
                // Redirect to rooms.html
                window.location.href = 'rooms.html';
            },
            error: function(error) {
                // Handle error response
                console.error('Error creating new room:', error);
                alert('Failed to create new room. Please try again.');
            }
        });
    });
});
