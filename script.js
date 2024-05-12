const contacts = [
    {
        contact_id: 1,
        first_name: "Alexander",
        last_name: "Ivanov",
        phone: "+359 88 754 6544",
        company: "Strypes Inc.",
        email: "alexander2@gmail.com",
        address: "123 Main St Sofia",
        birthday: "1990-01-01",
        user_id: 123
    }
];

function populateContactDetails(contact) {
    const tbody = document.getElementById('contact-details-body');
    tbody.innerHTML = ''; 

    const newRow = document.createElement('tr');

    Object.values(contact).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        newRow.appendChild(cell);
    });

    tbody.appendChild(newRow);

    document.querySelector('.contact-details-table').style.display = 'table';
    document.querySelector('.buttons').style.display = 'block';
}

function handleViewDetails(event) {
    const button = event.target;
    const contactDiv = button.closest('.contact');
    const contactIndex = parseInt(contactDiv.dataset.index);
    const contact = contacts[contactIndex];
    populateContactDetails(contact);

    const detailsContainer = document.querySelector('.contact-details-container');
    detailsContainer.style.display = 'block';
}

function displayContacts() {
    const contactSpiral = document.querySelector('.contact-spiral');

    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.dataset.index = index;
        contactDiv.innerHTML = `
            <div class="contact-details">
                <img src="https://via.placeholder.com/100" alt="Profile Picture">
                <h2>${contact.first_name} ${contact.last_name}</h2>
                <p>${contact.phone}</p>
                <p>${contact.email}</p>
                <button class="view-details">View All Details</button>
            </div>
        `;
        contactSpiral.appendChild(contactDiv);

        const buttons = contactDiv.querySelectorAll('.view-details');
        buttons.forEach(button => {
            button.addEventListener('click', handleViewDetails);
        });
    });
}

function searchContacts(input) {
    const searchTerm = input.value.toLowerCase();
    const searchResultsList = document.getElementById('search-results');

 
    if (!searchTerm) {
        searchResultsList.style.display = 'none'; 
        return; 
    }

    const searchResults = contacts.filter(contact => {
        const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
        return fullName.includes(searchTerm);
    });

    searchResultsList.innerHTML = '';
    searchResults.forEach(contact => {
        const listItem = document.createElement('li');
        listItem.textContent = `${contact.first_name} ${contact.last_name}`;
        listItem.addEventListener('click', () => {
            input.value = `${contact.first_name} ${contact.last_name}`;
            searchResultsList.style.display = 'none';
        });
        searchResultsList.appendChild(listItem);
    });

    if (searchResults.length > 0) {
        searchResultsList.style.display = 'block';
    } else {
        searchResultsList.style.display = 'none';
    }
}

window.addEventListener('load', displayContacts);

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function() {
    searchContacts(this);
});