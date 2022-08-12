import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { createBook, editBook, getBookById } from '../api/data.js';


let editTemplate = (book, onSubmit) => html`
<section id="edit-page" class="edit">
    <form @submit=${onSubmit} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" value=${book.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description">${book.description}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" value=${book.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" value=${book.type}>
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>
`


export async function editPage(ctx) {                // async as we need to request the book

    const book = await getBookById(ctx.params.id);

    ctx.render(editTemplate(book, onSubmit));     // put book in the template

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);        // console.log(...formData.entries()) to check in console

        let title = formData.get('title').trim();
        let description = formData.get('description').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let type = formData.get('type').trim();

        if (title == '' || description == '' || imageUrl == '' || type == '') {
            return alert('Please, fill all fields!');
        }

        await editBook(ctx.params.id, {
            title,
            description,
            imageUrl,
            type
        })

        ctx.page.redirect('/details/' + ctx.params.id);       // can use book._id as well 
    }
}