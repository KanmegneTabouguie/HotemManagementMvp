$(document).ready(function() {
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:3068/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email, password: password }),
            success: function(response) {
                const token = response.sessionToken;
                const userId = response.userId;
                const userRole = response.role;

                // Store the token, userId, and userRole for subsequent requests
                localStorage.setItem('sessionToken', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('userRole', userRole);

                // Redirect based on user role
                if (userRole === 'admin') {
                    window.location.href = '../components/admindashboard.html';
                } else {
                    window.location.href = '../components/guestdashboard.html';
                }
            },
            error: function(error) {
                $('#result').html('<div class="alert alert-danger">Login failed. Please try again.</div>');
            }
        });
    });

    // Toggle password visibility
    $('#togglePassword').on('click', function() {
        const passwordField = $('#password');
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        $(this).find('i').toggleClass('fa-eye fa-eye-slash');
    });
});
