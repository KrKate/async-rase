import createButton from "./createButton";

function createPaginationButton(page: string) {
    const paginationButtonContainer = document.createElement('div');
    paginationButtonContainer.className = 'pagination-button-container';

    const prevButton = createButton('PREV', `${page}-prev-button`);
    const nextButton = createButton('NEXT', `${page}-next-button`);

    paginationButtonContainer.append(prevButton, nextButton);
    return paginationButtonContainer;
  }

export default createPaginationButton;
