import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { updateInfo } from '../app.js'

export const onLogout = () => {
    fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': localStorage.token
        }
    })

    localStorage.clear();
    page.redirect('/catalog');
    updateInfo();
}
