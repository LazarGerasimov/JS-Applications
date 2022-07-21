import {html, render} from './node_modules/lit-html/lit-html.js';
import {getAllStudents} from './api.js';
import {studentsTemplate} from './students.js';
import {search} from './search.js';

let tableBody = document.querySelector('.container tbody');
let studentsData = await getAllStudents();
let template = studentsTemplate(Object.values(studentsData));

render(template, tableBody)

let searchButton = document.querySelector('#searchBtn');
searchButton.addEventListener('click', search)

