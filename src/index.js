import "./styles.css";
import pictureCardTmpl from "./cardTmpl.hbs";
import ApiService from "./apiService";
const apiService = new ApiService();
console.log(apiService);
document.body.insertAdjacentHTML(
  "afterbegin",
  ` <form class="search-form" id="search-form">
  <input
    type="text"
    name="query"
    autocomplete="off"
    placeholder="Search images..."
  />
</form>`
);
const refs = {
  searchForm: document.querySelector(".search-form"),
};
const listEl = document.createElement("ul");
listEl.classList.add("gallery");
document.body.append(listEl);
const loadMoreBtn = document.createElement("button");
loadMoreBtn.classList.add("loadbtn");
loadMoreBtn.textContent = "Load more";
document.body.append(loadMoreBtn);
refs.searchForm.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", () => {
  apiService.fetchPicture().then((hits) => {
    picMarkup(hits);
  });
});

function onSearch(e) {
  e.preventDefault();
  console.log(e.target);
  apiService.searchQuery = e.currentTarget.elements.query.value;
  if (apiService.searchQuery === "") {
    return alert("Add something...please");
  }

  apiService.resetPage();
  apiService.fetchPicture().then((hits) => {
    clearCardList();
    picMarkup(hits);
  });
}

function picMarkup(hits) {
  listEl.insertAdjacentHTML("beforeend", pictureCardTmpl(hits));
  /*   window.scrollTo({
    top: listEl.scrollHeight,
    behavior: "smooth",
  }); */
  /* window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: "smooth",
  }); */
}

function clearCardList() {
  listEl.innerHTML = "";
}

function show() {
  loadMoreBtn.classList.remove("is-hidden");
}
function hide() {
  loadMoreBtn.classList.add("is-hidden");
}
