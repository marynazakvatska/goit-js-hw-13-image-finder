const API_KEY = "21675881-9f2314d809854342b3af65054";
const BASE_URL = "https://pixabay.com/api";

export default class ApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  fetchPicture() {
    // console.log(this)
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=`;
    return fetch(`${url}${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        this.incrementPage();
        console.log(data);
        return data.hits;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
