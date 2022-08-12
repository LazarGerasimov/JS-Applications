import {render} from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../api/api.js';
import { getUserData } from '../util.js';
import page from '../../node_modules/page/page.mjs'


const root = document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/')
}

export function decorateContext(ctx, next) {

    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}



export function updateUserNav() {
    let userData = getUserData();

    if(userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}


