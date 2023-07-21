import { createTableTitle } from "./createWinnerTable";
import createPaginationButton from "../../common/createPagButton";
import { getWinners } from "../../common/server";

class WinnersPage {
    private container: HTMLElement;

    static TextObject = {
        WinnersTitle: 'Winners'
    }

    constructor(id: string) {
        this.container = document.createElement('div');
        this.container.id = id;
    }

    private createHeaderTitle(text: string, count: number, page: number) {
        const headerContainer = document.createElement('div');
        headerContainer.className = 'header-container';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'winner-title-container';

        const headerTitle = document.createElement('h1');
        headerTitle.innerText = text;

        const winnersCount = document.createElement('span');
        winnersCount.textContent = `(${count})`;

        const pageNumber = document.createElement('h4');
        pageNumber.innerText = `Page #${page}`;

        titleContainer.append(headerTitle, winnersCount)
        headerContainer.append(titleContainer, pageNumber);

        return headerContainer;
    }


    async render() {
        const title = this.createHeaderTitle(WinnersPage.TextObject.WinnersTitle, 3, 1);
        const tableTitle = createTableTitle();
        const table = await getWinners();
        const pagination = createPaginationButton();
        this.container.append(title, tableTitle, table, pagination);
        return this.container
    }
}

export default WinnersPage;
