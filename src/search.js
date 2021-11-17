const searchForQuery = async (KEY,query,page) => {
    const API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    try {
        const response = await fetch(API);
        const responseData = response.json();
            return responseData;

    } catch (err) {
        console.log(response.err)
        throw err;
    }
}

export default searchForQuery;