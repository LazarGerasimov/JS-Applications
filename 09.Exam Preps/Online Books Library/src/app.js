import page from '../node_modules/page/page.mjs';
import { decorateContext, updateUserNav } from './middlewares/decorateContext.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


import * as api from './api/data.js';                   // for testing purposes
import { editPage } from './views/edit.js';
import { myBooksPage } from './views/my-books.js';
import { searchPage } from './views/search.js';



window.api = api;               // for testing purposes


page(decorateContext);

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-books', myBooksPage);
page('/search', searchPage);

updateUserNav();
page.start();