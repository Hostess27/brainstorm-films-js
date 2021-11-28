import filmCardTpl from '../templates/librariFilmCard.hbs';

class LibraryRenderer
{
    #librariContainer;

    constructor()
    {
        this.#librariContainer = document.querySelector('.list-library');
    }

    render(data)
    {
        this.#librariContainer.insertAdjacentHTML('beforeend', filmCardTpl(data));
    }

    clear()
    {
        this.#librariContainer.innerHTML = '';
    }
}

export default new LibraryRenderer();