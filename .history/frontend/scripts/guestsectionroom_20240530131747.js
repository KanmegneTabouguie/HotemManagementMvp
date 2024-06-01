$(document).ready(function() {
    const token = localStorage.getItem('sessionToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userRole) {
        window.location.href = 'login.html';
        return;
    }

    const roomsPerPage = 6;
    let currentPage = 1;
    let rooms = [];
    let filteredRooms = [];

    // Fetch rooms data
    $.ajax({
        url: 'http://localhost:3068/rooms',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'x-userrole': userRole
        },
        success: function(response) {
            rooms = response.rooms;
            filteredRooms = rooms;
            displayRooms(currentPage);
            setupPagination(filteredRooms.length);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching rooms:', error);
        }
    });

    // Function to display rooms in cards
    function displayRooms(page) {
        const roomCardsContainer = $('#roomCards');
        roomCardsContainer.empty();
        const startIndex = (page - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        const paginatedRooms = filteredRooms.slice(startIndex, endIndex);

        if (paginatedRooms.length === 0) {
            roomCardsContainer.append('<div class="col-md-12">No rooms available.</div>');
            return;
        }

        paginatedRooms.forEach(room => {
            const cardHtml = `
            <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center bg-secondary text-light">
                    <span class="font-weight-bold">${room.room_number}</span>
                    <button class="btn btn-link preference-btn" data-room-id="${room.id}">
                        <i class="bi bi-heart preference-heart"></i>
                    </button>
                </div>
                <img src="${room.image}" class="card-img-top" alt="Room Image">
                <div class="card-body">
                    <h5 class="card-title">${room.type}</h5>
                    <p class="card-text">$${room.price_per_night.toFixed(2)} per night</p>
                    <p class="card-text">${room.availability ? 'Available' : 'Not Available'}</p>
                </div>
            </div>
        </div>
            `;
            roomCardsContainer.append(cardHtml);
        });
    }



// Function to toggle room preference
$('#roomCards').on('click', '.preference-btn', function() {
    const roomId = $(this).data('room-id');
    const roomIndex = rooms.findIndex(room => room.id === roomId);

    if (roomIndex !== -1) {
        rooms[roomIndex].preference = !rooms[roomIndex].preference;
        $(this).find('.preference-heart').toggleClass('text-danger', rooms[roomIndex].preference);
    }
});









    // Function to setup pagination
    function setupPagination(totalRooms) {
        const totalPages = Math.ceil(totalRooms / roomsPerPage);
        const paginationControls = $('#paginationControls');
        paginationControls.empty();

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = `<li class="page-item ${i === currentPage ? 'active' : ''}">
                                <a class="page-link" href="#">${i}</a>
                              </li>`;
            paginationControls.append(pageItem);
        }

        $('.page-link').click(function(e) {
            e.preventDefault();
            const page = parseInt($(this).text());
            currentPage = page;
            displayRooms(page);
            setupPagination(totalRooms);
        });
    }

    // Search and filter functionality
    $('#searchInput').on('input', function() {
        filterRooms();
    });

    $('#filterSelect').on('change', function() {
        filterRooms();
    });

    function filterRooms() {
        const searchTerm = $('#searchInput').val().toLowerCase();
        const filterTerm = $('#filterSelect').val();
    
        filteredRooms = rooms.filter(room => {
            const matchesSearch = room.room_number.toLowerCase().includes(searchTerm) || room.type.toLowerCase().includes(searchTerm);
            const matchesFilter = filterTerm ? room.type === filterTerm : true;
            return matchesSearch && matchesFilter;
        });
    
        if (filteredRooms.length === 0) {
            console.warn('No rooms match the search and filter criteria.');
        }
    
        currentPage = 1; // Reset to first page
        displayRooms(currentPage);
        setupPagination(filteredRooms.length);
    }
    
    
});
