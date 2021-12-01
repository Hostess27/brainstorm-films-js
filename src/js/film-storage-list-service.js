class FilmStorage
{
    #STORAGE_WHATCHED_LIST_KEY;
    #STORAGE_QUEUE_LIST_KEY;

    constructor()
    {
        this.#STORAGE_WHATCHED_LIST_KEY = 'whatched';
        this.#STORAGE_QUEUE_LIST_KEY = 'queue';
    }

    addFilmToWatchedList(id, button)
    {
        let obj = localStorage.getItem(this.#STORAGE_WHATCHED_LIST_KEY)
        if(obj)
        {
            let arrFilms = JSON.parse(obj);
            if(Array.isArray(arrFilms))
            {
                if(arrFilms.includes(id))   
                {
                    button.innerText = "ADD TO WATCHED";
                    const updatedArray = Array.from(arrFilms);
                    let index = updatedArray.indexOf(id);
                    updatedArray.splice(index, 1);
                    localStorage.setItem(this.#STORAGE_WHATCHED_LIST_KEY, JSON.stringify(updatedArray));
                }
                else
                {
                    button.innerText = "REMOVE FROM WATCHED";
                    const updatedArray = Array.from(arrFilms);
                    updatedArray.push(id);
                    localStorage.setItem(this.#STORAGE_WHATCHED_LIST_KEY, JSON.stringify(updatedArray));
                }
            } 
        }
        else
        {
            const newArr = [];
            newArr.push(id);
            localStorage.setItem(this.#STORAGE_WHATCHED_LIST_KEY, JSON.stringify(newArr));
        }
    }



    updateWatchedBtn(id, button)
    {
        let obj = localStorage.getItem(this.#STORAGE_WHATCHED_LIST_KEY)
        if(obj)
        {
            let arrFilms = JSON.parse(obj);
            if(Array.isArray(arrFilms))
            {
                if(arrFilms.includes(id))
                {
                    button.innerText = "REMOVE FROM WATCHED";
                }
            } 
        }
    }

    addFilmToQueueList(id, button)
    {
        let obj = localStorage.getItem(this.#STORAGE_QUEUE_LIST_KEY)
        if(obj)
        {
            let arrFilms = JSON.parse(obj);
            if(Array.isArray(arrFilms))
            {
                if(arrFilms.includes(id))
                {
                    const updatedArray = Array.from(arrFilms);
                    let index = updatedArray.indexOf(id);
                    updatedArray.splice(index, 1);
                    localStorage.setItem(this.#STORAGE_QUEUE_LIST_KEY, JSON.stringify(updatedArray));
                    button.innerText = "ADD TO QUEUE";
                }
                else
                {
                    const updatedArray = Array.from(arrFilms);
                    updatedArray.push(id);
                    localStorage.setItem(this.#STORAGE_QUEUE_LIST_KEY, JSON.stringify(updatedArray));
                    button.innerText = "REMOVE FROM QUEUE";
                }
            } 
        }
        else
        {
            const newArr = [];
            newArr.push(id);
            localStorage.setItem(this.#STORAGE_QUEUE_LIST_KEY, JSON.stringify(newArr));
        }
    }



    updateQueueBtn(id, button)
    {
        let obj = localStorage.getItem(this.#STORAGE_QUEUE_LIST_KEY)
        if(obj)
        {
            let arrFilms = JSON.parse(obj);
            if(Array.isArray(arrFilms))
            {
                if(arrFilms.includes(id))
                {
                    button.innerText = "REMOVE FROM QUEUE";
                }
            } 
        }
    }
}

export default new FilmStorage();