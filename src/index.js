import "./styles.css";
import pictureCardTmpl from "./cardTmpl.hbs";
import ApiService from "./apiService";

const apiService = new ApiService();
/* console.log(apiService); */

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
  /* 
  list: document.querySelector("ul"), */
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
  /* loadMoreBtn.scrollIntoView({
    behavior: "smooth",
    block: loadMoreBtn,
  }); */
});

function onSearch(e) {
  e.preventDefault();

  console.log(e.target);
  apiServiсe.query = e.currentTarget.elements.query.value;

  if (apiService.query === "") {
    return alert("Add something...");
  }

  apiService.resetPage();
  apiService.fetchPicture().then((hits) => {
    clearCardList();
    picMarkup(hits);
  });
}

/* function onLoadMore() {
  apiService.fetchPicture().then((hits) => {
    picMarkup(hits);
  });
} */
/* 
window.scrollTo({
  top: document.documentElement.scrollHeight,
  behavior: "smooth",
}); */

function picMarkup(hits) {
  listEl.insertAdjacentHTML("beforeend", pictureCardTmpl(hits));
}
function clearCardList() {
  listEl.innerHTML = "";
}
