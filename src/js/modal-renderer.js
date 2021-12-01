import filmCardTemplate from '../templates/modalFilmTemplate.hbs';

class ModalFilmRenderer
{
    #modalFilDetailContainer;

    constructor()
    {
        this.#modalFilDetailContainer = document.querySelector('.film-detail');
    }

    render(data)
    {
        this.#modalFilDetailContainer.insertAdjacentHTML('beforeend', filmCardTemplate(data));
    }

    clear()
    {
        this.#modalFilDetailContainer.innerHTML = '';
    }
}

export default new ModalFilmRenderer();