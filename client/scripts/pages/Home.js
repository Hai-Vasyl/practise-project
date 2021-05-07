// import { fetchData } from "../helpers/fetchData.js";
import { getParamQuery } from "../helpers/getParamsQuery.js";
import FieldPicker from "../components/FieldPicker.js";

export default async function () {
  // const books = await fetchData(
  //   `https://www.googleapis.com/books/v1/volumes?q=${"Harry"}&startIndex=${}&maxResults=${}&filter=${"free-ebooks"}&printType=${"magazines"}&orderBy=${"newest"}&projection=lite`,
  // );
  const filter = getParamQuery("filter");
  const type = getParamQuery("type");
  const sort = getParamQuery("sort");
  const search = getParamQuery("search");

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
            <input class="field__input header__input" id="search-input" type="text" value="${
              search || ""
            }" placeholder="Search" />
            <span class="material-icons-outlined header__icon">
              search
            </span>
          </form>
          <p class="header__results">Results: sdfs</p>
        </div>
      </header>
      <div class="toolbar">
        <div class="toolbar__wrapper" >
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
