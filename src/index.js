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

refs.searchForm.addEventListener("submit", onSearch);
hide();
function onSearch(e) {
  e.preventDefault();

  console.log(e.target);
  apiService.searchQuery = e.currentTarget.elements.query.value;
  if (
    e.currentTarget.elements.query.value[0] === " " ||
    e.currentTarget.elements.query.value === ""
  ) {
    return alert("Add something...please");
  }

  apiService.resetPage();
  apiService.fetchPicture().then((hits) => {
    clearCardList();
    picMarkup(hits);
  });
}

const loadMoreBtn = document.createElement("button");
loadMoreBtn.classList.add("loadbtn");
loadMoreBtn.textContent = "Load more";
document.body.append(loadMoreBtn);
loadMoreBtn.addEventListener("click", () => {
  apiService.fetchPicture().then((hits) => {
    picMarkup(hits);
  });
});

function picMarkup(hits) {
  listEl.insertAdjacentHTML("beforeend", pictureCardTmpl(hits));

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
  /* show(); */
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
