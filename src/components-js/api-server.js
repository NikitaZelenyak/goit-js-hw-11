const axios = require('axios');


export default class ImgAPiServer{
    constructor() {
        this.searchQuery = '';
        this.pageCounter = 1;
    }
    async fetchPhoto () {
  const API_KEY = '28567553-c50dbf8952c0a87639e336527';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pageCounter}&per_page=40`;

        try {
            const response = await axios.get(URL);
// console.log(response.data.totalHits);
     return response.data.hits 
          
     

        } catch (error) {
          

            return error;
  }
    }
    get page(){
    return this.pageCounter
    }
    set page(newPage) {
        return this.pageCounter = newPage;
    }
  

    get query() {
        return  this.searchQuery
    }

    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
}