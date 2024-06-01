$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userRole) {
        window.location.href = 'login.html';
        return;
    }

    $('#partialUpdateRoomForm').on('submit', function(event) {
        event.preventDefault();
        
        const roomNumber = $('#roomNumber').val().trim();
        const roomType = $('#roomType').val().trim();
        const pricePerNight = $('#pricePerNight').val().trim();
        const availability = $('#availability').val();
        const image = $('#image').val().trim();

        const data = {};
        if (roomNumber) data.room_number = roomNumber;
        if (roomType) data.type = roomType;
        if (pricePerNight) data.price_per_night = parseFloat(pricePerNight);
        if (availability) data.availability = availability === 'true';
        if (image) data.image = image;

        $.ajax({
            url: `http://localhost:3068/rooms/${roomId}`,
            type: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            data: JSON.stringify(data),
            success: function(response) {
                $('#result').html('<div class="alert alert-success">Room updated successfully.</div>');
            },
            error: function(error) {
                console.error('Error updating room:', error);
                $('#result').html('<div class="alert alert-danger">Failed to update room. Please try again.</div>');
            }
        });
    });
});
