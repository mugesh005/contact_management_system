document.addEventListener('DOMContentLoaded', function () {
    loadContacts();
});

function loadContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    contacts.forEach(function (contact, index) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${contact.name}</strong> <span>${contact.phone}</span> <span>${contact.email}</span> 
            <button class="edit" onclick="editContact(${index})">Edit</button>
            <button class="delete" onclick="deleteContact(${index})">Delete</button>`;
        contactList.appendChild(listItem);
    });
}

function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const contact = { name, phone, email };

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contact);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    loadContacts();
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
}
function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];
    if (contact) {
        const updatedName = prompt('Enter new name:', contact.name);
        const updatedPhone = prompt('Enter new phone number:', contact.phone);
        const updatedEmail = prompt('Enter new email address:', contact.email);

        if (updatedName !== null && updatedPhone !== null && updatedEmail !== null) {
            contact.name = updatedName;
            contact.phone = updatedPhone;
            contact.email = updatedEmail;

            localStorage.setItem('contacts', JSON.stringify(contacts));
            loadContacts();
        }
    }
}
function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    if (confirm('Are you sure you want to delete this contact?')) {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    }
}
