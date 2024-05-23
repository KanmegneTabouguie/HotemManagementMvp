$(document).ready(function() {
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');
    let currentPage = 1; // Initialize current page
    const itemsPerPage = 5; // Number of items per page
    let allRooms = []; // Array to store all rooms data

    // Fetch all rooms data
    function fetchAllRooms() {
        $.ajax({
            url: `http://localhost:3067/rooms`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            success: function(response) {
                console.log('All Rooms data:', response.rooms); // Log the rooms data
                allRooms = response.rooms;
                renderRooms(currentPage);
            },
            error: function(error) {
                $('#result').html('<div class="alert alert-danger">Failed to fetch rooms data.</div>');
                console.error('Error fetching rooms data:', error); // Log the error
            }
        });
    }

    // Pagination event listeners
    $('#prevPage').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderRooms(currentPage);
        }
    });

    $('#nextPage').on('click', function() {
        if (currentPage < Math.ceil(allRooms.length / itemsPerPage)) {
            currentPage++;
            renderRooms(currentPage);
        }
    });

    // Initial fetch
    fetchAllRooms();

    function renderRooms(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedRooms = allRooms.slice(startIndex, endIndex);

        displayRooms(paginatedRooms);
        updatePaginationButtons();
    }

    function displayRooms(rooms) {
        if (rooms.length === 0) {
            $('#rooms').html('<div class="alert alert-info">No rooms available.</div>');
            return;
        }

        let tableHtml = '<table class="table table-striped">';
        tableHtml += `
            <thead>
                <tr>
                    <th>Room Number</th>
                    <th>Type</th>
                    <th>Price Per Night</th>
                    <th>Availability</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
        `;

        rooms.forEach(room => {
            console.log('Room:', room); // Log each room object
            tableHtml += `
                <tr>
                    <td>${room.room_number}</td>
                    <td>${room.type}</td>
                    <td>$${room.price_per_night.toFixed(2)}</td>
                    <td>${room.availability ? 'Available' : 'Not Available'}</td>
                    <td><img src="${room.image}" alt="Room Image" style="width: 100px; height: auto;"></td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Action buttons">
                            <button class="btn btn-info btn-sm btn-view" data-id="${room.id}"><i class="far fa-eye"></i></button>
                            <button class="btn btn-warning btn-sm btn-update" data-id="${room.id}"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-success btn-sm btn-partial-update" data-id="${room.id}"><i class="fas fa-pen"></i></button>
                            <button class="btn btn-danger btn-sm btn-delete" data-id="${room.id}"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });

        tableHtml += '</tbody></table>';
        $('#rooms').html(tableHtml);

        // Add event listeners for the action buttons
        $('.btn-view').on('click', handleView);
        $('.btn-update').on('click', handleUpdate);
        $('.btn-partial-update').on('click', handlePartialUpdate);
        $('.btn-delete').on('click', handleDelete);
    }


    function handleView() {
        const roomId = $(this).data('id');
        // Fetch room details and display only the details of the selected room
        $.ajax({
            url: `http://localhost:3067/rooms/${roomId}`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            success: function(response) {
                console.log('Response:', response); // Log the response object
                if (response && response.room && response.room.length > 0) {
                    const room = response.room[0];
                    console.log('Room:', room); // Log the room object
                    let pricePerNight = room.price_per_night;
                    if (typeof pricePerNight === 'number' && !isNaN(pricePerNight)) {
                        pricePerNight = '$' + pricePerNight.toFixed(2);
                    } else {
                        pricePerNight = 'N/A';
                    }
                    const modalContent = `
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td><strong>Room Number:</strong></td>
                                    <td>${room.room_number}</td>
                                </tr>
                                <tr>
                                    <td><strong>Type:</strong></td>
                                    <td>${room.type}</td>
                                </tr>
                                <tr>
                                    <td><strong>Price Per Night:</strong></td>
                                    <td>${pricePerNight}</td>
                                </tr>
                                <tr>
                                    <td><strong>Availability:</strong></td>
                                    <td>${room.availability ? 'Available' : 'Not Available'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <img src="${room.image}" alt="Room Image" style="width: 100px; height: auto;">
                    `;
                    console.log('Modal Content:', modalContent);
    
                    // Clear the existing modal content
                    $('#roomDetails').empty();
                    // Append the new content to the modal body
                    $('#roomDetails').append(modalContent);
                    $('#roomModal').modal('show'); // Show the modal
                } else {
                    console.error('Room data not found in response:', response);
                    alert('Failed to fetch room details. Please try again.');
                }
            },
            error: function(error) {
                console.error('Error fetching room details:', error);
                alert('Failed to fetch room details. Please try again.');
            }
        });
    }
    
    function handleUpdate() {
        const roomId = $(this).data('id');
        // Navigate to the update page with the room ID as a query parameter
        window.location.href = `updateRoom.html?id=${roomId}`;
    }

    function handlePartialUpdate() {
        const roomId = $(this).data('id');
        window.location.href = `partialUpdateRoom.html?id=${roomId}`;
    }

    function handleDelete() {
        const roomId = $(this).data('id');
        if (confirm('Are you sure you want to delete this room?')) {
            $.ajax({
                url: `http://localhost:3067/rooms/${roomId}`,
                type: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'x-userrole': userRole
                },
                success: function(response) {
                    console.log('Room deleted:', response);
                    alert('Room deleted successfully.');
                    
                    // Remove the deleted room from allRooms array
                    allRooms = allRooms.filter(room => room.id !== roomId);
                    
                    // Render the current page with updated data
                    renderRooms(currentPage);
                },
                error: function(error) {
                    console.error('Error deleting room:', error);
                    alert('Failed to delete room. Please try again.');
                }
            });
        }
    }
    
    function updatePaginationButtons() {
        if (currentPage === 1) {
            $('#prevPage').prop('disabled', true);
        } else {
            $('#prevPage').prop('disabled', false);
        }

        if (currentPage === Math.ceil(allRooms.length / itemsPerPage)) {
            $('#nextPage').prop('disabled', true);
        } else {
            $('#nextPage').prop('disabled', false);
        }
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        console.log('Logout button clicked.'); // Added console log
        // AJAX request to logout
        $.ajax({
            url: 'http://localhost:3067/auth/logout',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            success: function(response) {
                // Clear localStorage and redirect to login page
                localStorage.clear();
                window.location.href = 'login.html';
            },
            error: function(xhr, status, error) {
                console.error('Error logging out:', error);
                // Handle error, show error message, etc.
            }
        });
    });
    
    

});

