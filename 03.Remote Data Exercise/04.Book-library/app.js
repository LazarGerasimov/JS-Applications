let loadBookButton = document.querySelector('#loadBooks');
let url = `http://localhost:3030/jsonstore/collections/books`;

let tbodyElement = document.getElementsByTagName('tbody')[0];
let formElement = document.getElementsByTagName('form')[0];

loadBookButton.addEventListener('click', loadBooks);

formElement.addEventListener('submit', async function(e) {
    e.preventDefault();


})

async function loadBooks(e) {

    try {

        let response = await fetch(url);

        if (response.status !== 200) {
            throw new Error('Problem loading data');
        }

        let data = await response.json();

        let entries = Object.entries(data);
        tbodyElement.innerHTML = '';

        for (let [key, {author, title}] of entries) {

            let trElement = document.createElement('tr');

            let titleTDElement = document.createElement('td');
            titleTDElement.textContent = title;

            let authorTDElement = document.createElement('td');
            authorTDElement.textContent = author;

            trElement.appendChild(titleTDElement);
            trElement.appendChild(authorTDElement);

            let newTDElement = document.createElement('td');

            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', onEdit);
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', onDelete);

            newTDElement.appendChild(editButton);
            newTDElement.appendChild(deleteButton);

            trElement.appendChild(newTDElement);
            tbodyElement.appendChild(trElement);

            async function onEdit(e) {
                
            }

            async function onDelete(e) {
                e.preventDefault();

                let response = await fetch(`${url}/${key}`, {
                    method: 'DELETE'
                })

                trElement.remove();
            }

        }

        console.log(entries)

    } catch (error) {

    }
}