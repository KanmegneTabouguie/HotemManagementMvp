$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userRole) {
        window.location.href = 'login.html';
        return;
    }

    // Fetch existing room data
    $.ajax({
        url: `http://localhost:3068/rooms/${roomId}`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'x-userrole': userRole
        },
        success: function(response) {
            if (response && response.room) {
                const room = response.room;
                $('#room_number').val(room.room_number);
                $('#type').val(room.type);
                $('#price_per_night').val(room.price_per_night);
                $('#availability').val(room.availability ? 'true' : 'false'); // Handle undefined or missing availability
                $('#image').val(room.image);
            } else {
                alert('Failed to fetch room details.');
            }
        },
        error: function(error) {
            console.error('Error fetching room details:', error);
            alert('Failed to fetch room details.');
        }
    });

    // Handle form submission
    $('#updateRoomForm').on('submit', function(event) {
        event.preventDefault();

        const updatedRoom = {
            room_number: $('#room_number').val(),
            type: $('#type').val(),
            price_per_night: parseFloat($('#price_per_night').val()),
            availability: $('#availability').val() === 'true',
            image: $('#image').val()
        };

        console.log('Updating room with data:', updatedRoom); // Log the updated room data

        $.ajax({
            url: `http://localhost:3068/rooms/${roomId}`,
            type: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            data: JSON.stringify(updatedRoom),
            success: function(response) {
                alert('Room updated successfully!');
                window.location.href = 'rooms.html';
            },
            error: function(error) {
                console.error('Error updating room:', error);
                alert('Failed to update room. Please ensure all fields are filled correctly.');
            }
        });
    });
});
