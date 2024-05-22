// JavaScript Code for Search Functionality
document.getElementById('searchButton').addEventListener('click', function() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const visibleRows = document.querySelectorAll('#userTableBody tr:not([style*="display: none"])');

    visibleRows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const name = cells[0].textContent.toLowerCase();
        const email = cells[1].textContent.toLowerCase();
        const role = cells[2].textContent.toLowerCase();

        if (name.includes(searchValue) || email.includes(searchValue) || role.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
