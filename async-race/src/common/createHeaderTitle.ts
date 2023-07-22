
function createHeaderTitle(text: string, page: number, count: number) {
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';

    const headerWrapper = document.createElement('div');
    headerWrapper.className = 'header-wrapper';

    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;

    const carsCount = document.createElement('div');
    carsCount.className = 'cars-count';
    carsCount.innerText = `(${count} cars)`

    const pageNumber = document.createElement('h4');
    pageNumber.innerText = `Page #${page}`;

    headerWrapper.append(headerTitle, carsCount);
    headerContainer.append(headerWrapper, pageNumber);
    return headerContainer;
  }

export default createHeaderTitle;
