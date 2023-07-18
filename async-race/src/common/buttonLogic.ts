import {createCarAPI, getCarsAPI, pageNumber, countCars} from "./server";
import createCarContainer from "./createCar";

async function createNewCar() {
    const containerAllCar = <HTMLElement>document.querySelector('.container-all-car');
    const inputTextCreate = <HTMLInputElement>document.querySelector('.create-text-input');
    const inputColorCreate = <HTMLInputElement>document.querySelector('.create-color-input');
    const createButton = <HTMLButtonElement>document.querySelector('.create-button');
    const carsCount = <HTMLElement>document.querySelector('.cars-count');

    createButton?.addEventListener('click', async () => {
      const nameNewCar =  inputTextCreate.value;
      const colorNewCar =  inputColorCreate.value;
      containerAllCar.innerHTML = '';
      carsCount.innerHTML = '';
      console.log('create new car')
      await createCarAPI({ 'name': nameNewCar, 'color': colorNewCar });
      const arr = await getCarsAPI(pageNumber);
      console.log(arr);
      arr.forEach((car: { id: number; name: string; color: string; }) => {
        const carItem = createCarContainer(car.id, car.name, car.color);
        containerAllCar.appendChild(carItem);
      });
      countCars.count = arr.length;
      carsCount.innerHTML = `(${arr.length})`;
    });
  }

  export default createNewCar;
