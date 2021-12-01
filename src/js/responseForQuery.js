//В функцию searchForQuery (Поиск по ключевому слову) передаем :
//KEY - ключ доступа к API
//query-название фильма поиска
//page-номер страницы
//При вызове ф-ии получаем обьект данных в формате: {page: 1, results: Array(20), total_pages: 7, total_results: 138}
const searchForQuery = async (KEY, query, page) => {
    const API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    try {
        const response = await fetch(API);
        const responseData = await response.json();
        return responseData;

    } catch (err) {
        console.log(response.err)
        throw err;
    }
}

export default searchForQuery;


