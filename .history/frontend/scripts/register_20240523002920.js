$(document).ready(function() {
    $('#registerForm').on('submit', function(event) {
        event.preventDefault();
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:3067/auth/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: username, email: email, password: password, role: 'guest' }),
            success: function(response) {
                $('#result').html('<div class="alert alert-success">Registration successful. You can now <a href="login.html">login</a>.</div>');
                // Redirect the user to the login page
                window.location.href = '../components/login.html';
            },
            error: function(error) {
                $('#result').html('<div class="alert alert-danger">Registration failed. Please try again.</div>');
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
