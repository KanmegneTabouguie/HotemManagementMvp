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
            url: `http://localhost:3067/users`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            success: function(response) {
                const allUsers = response.users;
                renderEmailDomainChart(allUsers);
            },
            error: function(error) {
                $('#result').html('<div class="alert alert-danger">Failed to fetch users data.</div>');
            }
        });
    }

    // Render user email domain analysis chart
function renderEmailDomainChart(users) {
    const emailDomains = {}; // Object to store email domain counts

    // Count the occurrences of each email domain
    users.forEach(user => {
        const domain = user.email.split('@')[1];
        if (domain in emailDomains) {
            emailDomains[domain]++;
        } else {
            emailDomains[domain] = 1;
        }
    });

    // Sort email domains by count in descending order
    const sortedDomains = Object.keys(emailDomains).sort((a, b) => emailDomains[b] - emailDomains[a]);

    // Select top 5 email domains
    const topDomains = sortedDomains.slice(0, 5);

    // Extract domain labels and counts for Chart.js
    const labels = topDomains.map(domain => domain);
    const counts = topDomains.map(domain => emailDomains[domain]);

    // Render the chart using Chart.js
    const ctx = document.getElementById('emailDomainChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Email Domain Analysis',
                data: counts,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
