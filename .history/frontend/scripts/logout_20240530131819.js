$(document).ready(function() {
    // Event listener for logout button
    $('#logoutButton').on('click', function() {
        // Fetch token and userRole from localStorage
        const token = localStorage.getItem('sessionToken');
        const userRole = localStorage.getItem('userRole');
        
        // AJAX request to logout
        $.ajax({
            url: 'http://localhost:3068/auth/logout',
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
