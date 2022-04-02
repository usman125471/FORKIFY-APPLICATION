import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // console.log(btn);
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
      // console.log(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;

    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    // console.log(numPages);
    // console.log(currPage);

    //--> ONLY AT PAGE: 1
    if (currPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    //--> LAST PAGE
    if (currPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
        </button>
      `;
    }

    //--> JUST A SINGLE PAGE AND OTHER PAGES
    if (currPage < numPages) {
      return `
     <button data-goto="${
       currPage - 1
     }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
      </button>
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button>
    `;
    }

    // NO OTER PAGES OR JUST A SINGLE PAGE
    return ``;
  }
}
export default new PaginationView();
