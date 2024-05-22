$(document).ready(function() {
    // Fetch the session token from local storage
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userRole) {
        // If any of the required items are missing, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Constants for pagination
    const perPage = 10; // Number of users per page
    let currentPage = 1; // Current page number
    let allUsers = []; // Array to store all users

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
                allUsers = response.users;
                paginateAndDisplayUsers();
            },
            error: function(error) {
                $('#result').html('<div class="alert alert-danger">Failed to fetch users data.</div>');
            }
        });
    }

    // Display users based on pagination
    function paginateAndDisplayUsers() {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        const usersOnPage = allUsers.slice(startIndex, endIndex);
        displayUsers(usersOnPage);
        displayPagination();
    }

    // Fetch all users on page load
    fetchAllUsers();

    // Display users in the table
    function displayUsers(users) {
        if (users.length === 0) {
            $('#users').html('<div class="alert alert-info">No users available.</div>');
            return;
        }

        let tableHtml = '<table class="table table-striped">';
        tableHtml += `
            <thead class="thead-dark">
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
        `;

        users.forEach(user => {
            tableHtml += `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.role}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Action buttons">
                            <button class="btn btn-info btn-sm btn-view" data-id="${user.id}"><i class="far fa-eye"></i></button>
                            <button class="btn btn-warning btn-sm btn-update" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm btn-delete" data-id="${user.id}"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });

        tableHtml += '</tbody></table>';
        $('#users').html(tableHtml);

        // Add event listeners for the action buttons
        $('.btn-view').on('click', handleView);
        $('.btn-update').on('click', handleUpdate);
        $('.btn-delete').on('click', handleDelete);
    }

    function handleView() {
        const userId = $(this).data('id');
        $.ajax({
            url: `http://localhost:3067/users/${userId}`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'x-userrole': userRole
            },
            success: function(response) {
                const user = response.user;
                const modalContent = `
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><strong>Username:</strong></td>
                                <td>${user.username}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>${user.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Password:</strong></td>
                                <td>${user.password}</td>
                            </tr>
                            <tr>
                                <td><strong>Role:</strong></td>
                                <td>${user.role}</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                $('#userDetails').html(modalContent);
                $('#userModal').modal('show');
            },
            error: function(error) {
                alert('Failed to fetch user details. Please try again.');
            }
        });
    }

    function handleUpdate() {
        const userId = $(this).data('id');
        window.location.href = `update_user.html?id=${userId}`;
    }

    function handleDelete() {
        const userId = $(this).data('id');
        if (confirm('Are you sure you want to delete this user?')) {
            $.ajax({
                url: `http://localhost:3067/users/${userId}`,
                type: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'x-userrole': userRole
                },
                success: function(response) {
                    alert('User deleted successfully.');
                    location.reload();
                },
                error: function(error) {
                    alert('Failed to delete user. Please try again.');
                }
            });
        }
    }

    // Display pagination links
    function displayPagination() {
        const totalPages = Math.ceil(allUsers.length / perPage);
        let paginationHtml = '<ul class="pagination">';
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
        paginationHtml += '</ul>';
        $('#pagination').html(paginationHtml);

        // Add event listener for pagination links
        $('.page-link').on('click', function(e) {
            e.preventDefault();
            currentPage = parseInt($(this).data('page'));
            paginateAndDisplayUsers();
        });
    }
});
