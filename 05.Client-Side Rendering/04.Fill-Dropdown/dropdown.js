import {html, render} from './node_modules/lit-html/lit-html.js'

let url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function getAllItems() {
    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);

    return data;
}

let items = Object.values(await getAllItems());          // invoke 
let cardTemplate = html `${items.map(item => html `<option value="${item._id}">${item.text}</option>`)}`;
let main = document.getElementById('menu');
render(cardTemplate, main);

document.querySelector('input[type="submit"]').addEventListener('click', addItem);

async function addItem() {
    let text = document.querySelector('#itemText').value; 
    let response = fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({text})
    });

    let data = await response.json();

    items.push(data);
    cardTemplate = html `${items.map(item => html `<option value="${item._id}">${item.text}</option>`)}`;

    if (response.ok) {
        cardTemplate = html `${items.map(item => html `<option value="${item._id}">${item.text}</option>`)}`;
        render(cardTemplate, main);
    }
};