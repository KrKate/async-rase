import GaragePage from "./pages/garage/garage";
import WinnersPage from "./pages/winners/winners";
import Header from "./common/header";
import ErrorPage from "./pages/error/error";
import { createNewCar, deleteCar, changeCar, pagination } from "./pages/garage/garageLogic";
import { getWinners, updateCars } from "./common/server";


// ПРОБЛЕМА. После перехода на страницу winners перестают работать все функции (создание машинок, удаление) на странице garage
// Решено: добавить все функции в создание страницы

export enum PageIds {
   GARAGEPAGE = 'garage-page',
   WINNERSPAGE = 'winners-page'
}

class App {
  private static container: HTMLElement = document.body;

  private garage!: GaragePage;

  private header!: Header;

  private static currentPageId: string = 'current-page';

  static async renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.currentPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: GaragePage | WinnersPage | ErrorPage | null = null;

    if (idPage === PageIds.GARAGEPAGE) {
      page = new GaragePage(idPage);
    } else if (idPage === PageIds.WINNERSPAGE) {
      page = new WinnersPage(idPage);
    } else {
      page = new ErrorPage(idPage, '404');
    }

    if (page) {
      const pageHTML = await page.render();
      if (pageHTML instanceof HTMLElement) {
        pageHTML.id = App.currentPageId;
        App.container.append(pageHTML);
        createNewCar();
        updateCars();
        getWinners();
        deleteCar();
        changeCar();
        pagination()

      }
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    })
  }

  constructor() {
    this.garage = new GaragePage('garage-page');
    this.header = new Header('header', 'header');
  }

 async run() {
   App.container.append(this.header.render());
   await App.renderNewPage('garage-page');
   this.enableRouteChange();
  //  createNewCar();
  //  updateCars();
  //  getWinners();
  //  deleteCar();
  //  changeCar();
  };

}

export default App;
