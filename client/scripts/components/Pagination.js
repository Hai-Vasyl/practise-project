export default function (
  quantityItems,
  amountItemsPage,
  currentPageNumber,
  redirectLink,
) {
  const getQuantityPages = () => {
    const numPages = Math.ceil(quantityItems / amountItemsPage);
    return numPages;
  };

  const limit = getQuantityPages();
  const checkPageNumber = (number) => {
    if (number < limit) {
      return { current: true, next: true };
    } else if (number === limit) {
      return { current: true, next: false };
    } else {
      return { current: false, next: false };
    }
  };

  let countNumber =
    limit - currentPageNumber < 2
      ? currentPageNumber - (4 - (limit - currentPageNumber))
      : currentPageNumber - 2;
  if (countNumber <= 0) {
    countNumber = 1;
  }
  let pageNumbers = [];
  let i = 0;
  while (i !== 5) {
    const { current, next } = checkPageNumber(countNumber);
    if (current && next) {
      pageNumbers.push(countNumber);
      countNumber++;
      i++;
    } else if (current) {
      pageNumbers.push(countNumber);
      break;
    } else {
      break;
    }
  }

  // const handleMoveToPage = (isRight) => {
  //   getRedirectLink(isRight ? currentPageNumber + 1 : currentPageNumber - 1)
  // }

  const btnNumbers = pageNumbers.reduce((acumulator, number) => {
    const isActive = currentPageNumber === String(number);
    return (
      acumulator +
      `
      <button
        class="btn-number ${isActive ? "btn-number--active" : ""}"
      >
        <span>${number}</span>
      </button>
    `
    );
  }, "");

  const btnArrowLeft = !!currentPageNumber - 1;
  const btnArrowRight = checkPageNumber(currentPageNumber + 1).current;

  return `
    <div
      class="pagination"
    >
      <button
        disabled="${!btnArrowLeft}"
        class="pagination__arrow ${
          btnArrowLeft ? "pagination__arrow--active" : ""
        }"
      >
        <span class="material-icons-outlined">
          chevron_left
        </span>
      </button>
        ${btnNumbers}
      <button
        disabled="${!btnArrowRight}"
        class="pagination__arrow ${
          btnArrowRight ? "pagination__arrow--active" : ""
        }"
      >
        <span class="material-icons-outlined">
          navigate_next
        </span>
      </button>
    </div>
  `;
}
