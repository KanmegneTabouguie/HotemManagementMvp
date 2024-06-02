$(document).ready(function() {
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

    // Fetch all rooms data
    function fetchAllRooms() {
        $.ajax({
            url: `http://localhost:3068/rooms`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            success: function(response) {
                console.log('All Rooms data:', response.rooms); // Log the rooms data
                const allRooms = response.rooms;
                renderRoomTypeChart(allRooms);
            },
            error: function(error) {
                $('#result').html('<div class="alert alert-danger">Failed to fetch rooms data.</div>');
                console.error('Error fetching rooms data:', error); // Log the error
            }
        });
    }

    // Render room type distribution chart
    function renderRoomTypeChart(rooms) {
        const roomTypeCounts = {
            'luxe': 0,
            'standard': 0,
            'single': 0,
            'double': 0,
            'suite': 0
        };

        rooms.forEach(room => {
            if (room.type in roomTypeCounts) {
                roomTypeCounts[room.type]++;
            }
        });

        const ctx = document.getElementById('roomTypeChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(roomTypeCounts),
                datasets: [{
                    label: 'Room Type Distribution',
                    data: Object.values(roomTypeCounts),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initial fetch
    fetchAllRooms();
});
