$(document).ready(function() {
    // Fetch the session token from local storage
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userRole) {
        // If any of the required items are missing, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Fetch all users data
    function fetchAllUsers() {
        $.ajax({
            url: `http://localhost:3068/users`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            success: function(response) {
                const allUsers = response.users;
                renderUserRoleChart(allUsers);
            },
            error: function(error) {
                $('#result').html('<div class="alert alert-danger">Failed to fetch users data.</div>');
            }
        });
    }

    // Render user role distribution chart
function renderUserRoleChart(users) {
    const roleCounts = {}; // Object to store user role counts

    // Count the occurrences of each user role
    users.forEach(user => {
        const role = user.role;
        if (role in roleCounts) {
            roleCounts[role]++;
        } else {
            roleCounts[role] = 1;
        }
    });

    // Extract role labels and counts for Chart.js
    const labels = Object.keys(roleCounts);
    const counts = Object.values(roleCounts);

    // Render the chart using Chart.js
    const ctx = document.getElementById('userRoleChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'User Role Distribution',
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
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


    // Call fetchAllUsers function to fetch data and render chart
    fetchAllUsers();
});
