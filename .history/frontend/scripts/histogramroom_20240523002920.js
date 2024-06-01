$(document).ready(function() {
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

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
                const allRooms = response.rooms;
                renderRoomPriceHistogram(allRooms);
            },
            error: function(error) {
                $('#result').html('<div class="alert alert-danger">Failed to fetch rooms data.</div>');
                console.error('Error fetching rooms data:', error); // Log the error
            }
        });
    }

    // Render room price histogram
    function renderRoomPriceHistogram(rooms) {
        const prices = rooms.map(room => room.price_per_night);
        const bins = [0, 100, 200, 300, 400, 500]; // Define bins (adjust as needed)
        const priceCounts = Array(bins.length).fill(0);

        prices.forEach(price => {
            for (let i = 0; i < bins.length - 1; i++) {
                if (price >= bins[i] && price < bins[i + 1]) {
                    priceCounts[i]++;
                    break;
                }
            }
            if (price >= bins[bins.length - 1]) {
                priceCounts[bins.length - 1]++;
            }
        });

        const ctx = document.getElementById('roomPriceHistogram').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bins.map(bin => `$${bin}`),
                datasets: [{
                    label: 'Room Price Distribution',
                    data: priceCounts,
                    backgroundColor: priceCounts.map((_, index) => `rgba(54, 162, 235, ${0.5 + index * 0.1})`),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1 // Adjust the step size of y-axis ticks
                        }
                    }
                }
            }
        });
        
    }

    // Initial fetch
    fetchAllRooms();
});
