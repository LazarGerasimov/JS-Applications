import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getMyBooks } from '../api/data.js';
import { getUserData } from '../util.js';
import {bookPreview} from '../views/common.js'


const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    
    ${books.length == 0
    ? html `<p class="no-books">No books in database!</p>`
    : html `<ul class="my-books-list">
        ${books.map(bookPreview)}
    </ul>`
    }
</section>
`


export async function myBooksPage(ctx) {

    const userData = getUserData();

    const books = await getMyBooks(userData.id);

    ctx.render(myBooksTemplate(books))
}
