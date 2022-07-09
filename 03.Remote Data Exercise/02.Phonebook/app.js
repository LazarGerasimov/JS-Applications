function attachEvents() {
    
    const url = `http://localhost:3030/jsonstore/phonebook`;

    const ul = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    loadBtn.addEventListener('click', onLoad);
    createBtn.addEventListener('click', onCreate);

    async function onLoad(e) {

        ul.innerHTML = '';

        let response = await fetch(url);

        let data = await response.json();
        
        let parsedData = Object.values(data);

        //console.log(parsedData)

        parsedData.forEach(x => {
            let li = document.createElement('li');
            li.textContent = `${x.person}: ${x.phone}`;
            elementID = x._id;
            li.setAttribute('id', elementID)
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', onDelete)
            li.appendChild(deleteBtn);
            ul.appendChild(li);
        })
    }

    async function onCreate(e) {

        let personInput = person.value;
        let phoneInput = phone.value;

        if (personInput !== '' && phoneInput !== '') {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    person: personInput,
                    phone: phoneInput
                })
            });

            person.value = '';
            phone.value = '';

        }

    }

    async function onDelete(e) {
        let li_id = e.target.parentNode.id;
        e.target.parentNode.remove();
        
        const response = await fetch(`${url}/${li_id}`, {
            method: 'DELETE',            
        })
    }

}

attachEvents();