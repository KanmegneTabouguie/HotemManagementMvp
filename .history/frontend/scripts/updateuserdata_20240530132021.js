$(document).ready(function() {
    // Fetch the session token from local storage
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userRole) {
        // If any of the required items are missing, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Get the user ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // Fetch user data using the user ID
    $.ajax({
        url: `http://localhost:3068/users/${userId}`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'x-userrole': userRole
        },
        success: function(response) {
            // Populate the form with user data
            $('#usernameInput').val(response.user.username);
            $('#emailInput').val(response.user.email);
            $('#passwordInput').val(response.user.password);
            $('#roleInput').val(response.user.role);
        },
        error: function(error) {
            alert('Failed to fetch user data. Please try again.');
        }
    });

    // Handle form submission for updating user
    $('#updateUserForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        const updatedUserData = {
            username: $('#usernameInput').val(),
            email: $('#emailInput').val(),
            password: $('#passwordInput').val(),
            role: $('#roleInput').val()
        };

        // Send updated user data to the server
        $.ajax({
            url: `http://localhost:3068/users/${userId}`,
            type: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            data: JSON.stringify(updatedUserData),
            success: function(response) {
                alert('User updated successfully.');
                // Optionally, redirect to another page
                window.location.href = 'users.html';
            },
            error: function(error) {
                alert('Failed to update user. Please try again.');
            }
        });
    });
});