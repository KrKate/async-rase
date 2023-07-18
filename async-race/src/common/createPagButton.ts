import createButton from "./createButton";

function createPaginationButton() {
    const paginationButtonContainer = document.createElement('div');
    paginationButtonContainer.className = 'pagination-button-container';
    
    const prevButton = createButton('PREV', 'prev-button');
    const nextButton = createButton('NEXT', 'next-button');

    paginationButtonContainer.append(prevButton, nextButton);
    return paginationButtonContainer;
  }

export default createPaginationButton;
