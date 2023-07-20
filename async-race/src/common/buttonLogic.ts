import {createCarAPI, getCarsAPI, pageNumber, countCars, deleteCarAPI} from "./server";
import createCarContainer from "./createCar";

export async function createNewCar() {
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
      await createCarAPI({ 'name': nameNewCar, 'color': colorNewCar });
      const arr = await getCarsAPI(pageNumber);
      arr.forEach((car: { id: number; name: string; color: string; }) => {
        const carItem = createCarContainer(car.id, car.name, car.color);
        containerAllCar.appendChild(carItem);
      });
      countCars.count = arr.length;
      carsCount.innerHTML = `(${arr.length})`;
    });
  }



  export function deleteCar() {
    const carContainers = document.querySelectorAll('.car-container');
    const buttonsRemove = document.querySelectorAll('.button-remove');
    const carsCount = <HTMLElement>document.querySelector('.cars-count');
    const containerAllCar = <HTMLElement>document.querySelector('.container-all-car');

    buttonsRemove?.forEach((buttonRemove) => {
      buttonRemove.addEventListener('click', async () => {
        const carId = buttonRemove.getAttribute('data-remove');
        carContainers.forEach(async (carContainer) => {
          const containerId = carContainer.getAttribute('id');
          if (containerId === carId) {
            await deleteCarAPI(Number(carId)).then(() => carContainer.remove());
            await getCarsAPI(pageNumber);
            containerAllCar.innerHTML = '';
            carsCount.innerHTML = '';
            const arr = await getCarsAPI(pageNumber);
            arr.forEach((car: { id: number; name: string; color: string; }) => {
              const carItem = createCarContainer(car.id, car.name, car.color);
              containerAllCar.appendChild(carItem);
            });
            countCars.count = arr.length;
            carsCount.innerHTML = `${arr.length}`;
          }
        });
      });
    });
  }

