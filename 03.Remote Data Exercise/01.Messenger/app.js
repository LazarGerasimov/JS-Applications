const url = 'http://localhost:3030/jsonstore/messenger';
const messages = document.getElementById('messages');
const submitBtn = document.getElementById('submit');
const refreshBtn = document.getElementById('refresh');
const controlDiv = document.getElementById('controls');


function attachEvents() {

    submitBtn.addEventListener('click', postMessage);
    refreshBtn.addEventListener('click', loadAllMessages);

}

async function postMessage() {

    const [author, content] = [document.getElementById('author'), document.getElementById('content')];
    console.log(author.value)

    if (author.value !== '' || content !== '') {
        await request(url, { author: author.value, content: content.value });
        author.value = '';
        content.value = '';
    } else {
        alert('Fields are required');
    }

}

async function loadAllMessages(e) {
    const response = await fetch(url);
    //console.log(await data.json())
    const data = await response.json();
    //console.log(Object.values(data))

    messages.value = Object.values(data).map(({ author, content }) => {
        return `${author}: ${content}`
    }).join('\n');

    console.log(messages.value)
}

async function request(url, option) {

    if (option) {
        option = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(option)
        }
    }

    const response = await fetch(url, option);

    return response.json();
}

attachEvents();