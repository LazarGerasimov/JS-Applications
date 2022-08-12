import { deleteBook, getBookById, getLikesByBookId, getMyLikesByBookId, likeBook } from "../api/data.js";
import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from "../util.js";


const detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${bookControlsTemplate(book, isOwner, onDelete)}
            ${likesControlsTemplate(showLikeButton, onLike)} 
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`

const bookControlsTemplate = (book, isOwner, onDelete) => {                 // use function to nest templates, add params from other funcs
    if (isOwner) {
        return html`
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click="${onDelete}" class="button" href="javascript:void(0)">Delete</a>
        `                                                       // get book._id for this particular boook
    } else {
        return null;
    }
}

const likesControlsTemplate = (showLikeButton, onLike) => {
    if(showLikeButton) {
        return html `<a @click=${onLike} class="button" href="javasacript:void(0)">Like</a>`
    } else { 
        return null;
    }
}

export async function detailsPage(ctx) {

    const userData = getUserData();                                  // check logged user !!!

    const [book, likes, hasLike] = await Promise.all([
        getBookById(ctx.params.id),                       // ctx.params.id so we can use page('/details/:id', detailsPage);
        getLikesByBookId(ctx.params.id),
        userData ? getMyLikesByBookId(ctx.params.id, userData.id) : 0
    ])


    const isOwner = userData && userData.id == book._ownerId;        // chekf if IDs are == and add isOwner in detailsTemplate as param!!!
    const showLikeButton = userData != null && isOwner == false && hasLike == false;

    //console.log(book)
    //console.log(isOwner)

    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike));      // main render, add all params from sub funcs

    async function onDelete() {

        const choice = confirm(`Are you sure you want to delete ${book.title}?`);

        if (choice) {
            await deleteBook(ctx.params.id)         // or book._id, works the same 
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await likeBook(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id)
    }


} // detailsPage closing bracket