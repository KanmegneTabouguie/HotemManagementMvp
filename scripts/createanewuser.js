$(document).ready(function() {
    // Fetch the session token and user role from local storage
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userRole) {
        // If any of the required items are missing, redirect to login
        window.location.href = 'login.html';
        return;
    }

    $('#createUserForm').submit(function(event) {
        event.preventDefault();
        var formData = {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            role: $('#role').val()
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3067/users',
            headers: {
                'Content-Type': 'application/json',
                'x-userrole': userRole,
                'Authorization': 'Bearer ' + token
            },
            data: JSON.stringify(formData),
            success: function(response) {
                $('#result').html('<div class="alert alert-success">User created successfully</div>');
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                $('#result').html('<div class="alert alert-danger">Error - ' + errorMessage + '</div>');
            }
        });
    });
});