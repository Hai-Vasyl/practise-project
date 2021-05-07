// import { fetchData } from "../helpers/fetchData.js";
import { getParamQuery } from "../helpers/getParamsQuery.js";
import FieldPicker from "../components/FieldPicker.js";

export default async function () {
  const filter = getParamQuery("filter");
  const type = getParamQuery("type");
  const sort = getParamQuery("sort");
  const search = getParamQuery("search");

  // const books = await fetchData(
  //   `https://www.googleapis.com/books/v1/volumes?q=${"Harry"}&startIndex=${}&maxResults=${}&filter=${"free-ebooks"}&printType=${"magazines"}&orderBy=${"newest"}&projection=lite`,
  // );

  const filterPicker = await FieldPicker(
    "Filter by",
    "filter-picker",
    [
      { value: "partial", title: "Partial" },
      { value: "full", title: "Full" },
      { value: "free-ebooks", title: "Free ebooks" },
      { value: "paid-ebooks", title: "Paid ebooks" },
      { value: "ebooks", title: "Ebooks" },
    ],
    filter || "partial",
  );
  const typePicker = await FieldPicker(
    "Print type",
    "type-picker",
    [
      { value: "all", title: "All" },
      { value: "books", title: "Books" },
      { value: "magazines", title: "Magazines" },
    ],
    type || "all",
  );
  const sortPicker = await FieldPicker(
    "Sort by",
    "sort-picker",
    [
      { value: "relevance", title: "Relevance" },
      { value: "newest", title: "Newest" },
    ],
    sort || "relevance",
  );
  return `
    <div>
      <header class="header">
        <img class="header__bg" src="/../../images/home_bg_img.jpg" alt="Background image" />
        <div class="header__toolbar">
          <h1 class="header__title">Bookify</h1>
          <form class="header__form" id="search-form">
            <button type="button" class="header__reset ${
              search ? "header__reset--active" : ""
            }" id="btn-reset-search" >
              <span class="material-icons-outlined hidden">
                close
              </span>
            </button>
            <input class="field__input header__input ${
              search ? "header__input--filled" : ""
            }" id="search-input" type="text" value="${
    search || ""
  }" placeholder="Search" />
            <span class="material-icons-outlined header__icon">
              search
            </span>
          </form>
          <p class="header__results">Results: sdfs</p>
        </div>
      </header>
      <div class="filter-toggle">
        <button class="filter-toggle__btn" id="btn-toggle-filter">
            <span class="filter-toggle__title hidden">Filter tools</span>
            <span class="filter-toggle__icon hidden">
              <span></span>
              <span></span>
            </span>
        </button>
      </div>
      <div class="toolbar">
        <div class="toolbar__wrapper" id="toolbar-menu" >
          ${filterPicker}
          ${typePicker}
          ${sortPicker}
        </div>
      </div>
      <div>
        sdfsdf
      </div>
    </div>
  `;
}
