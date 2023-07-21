import {createCarAPI, getCarsAPI, pageNumber, countCars, deleteCarAPI, updateCarAPI} from "./server";
import createCarContainer from "./createCar";

const updateCarList = async () => {
  const containerAllCar = <HTMLElement>document.querySelector('.container-all-car');
  const carsCount = <HTMLElement>document.querySelector('.cars-count');

  const arr = await getCarsAPI(pageNumber);
  containerAllCar.innerHTML = '';
  carsCount.innerHTML = arr.length.toString();

  arr.forEach((car: { id: number; name: string; color: string; }) => {
    const carItem = createCarContainer(car.id, car.name, car.color);
    containerAllCar.appendChild(carItem);
  });
  countCars.count = arr.length;
  carsCount.innerHTML = `(${arr.length})`;
};


export async function createNewCar() {
  const createButton = <HTMLButtonElement>document.querySelector('.create-button');
  createButton?.addEventListener('click', async () => {
    const inputTextCreate = <HTMLInputElement>document.querySelector('.create-text-input');
    const inputColorCreate = <HTMLInputElement>document.querySelector('.create-color-input');

    const nameNewCar = inputTextCreate.value;
    const colorNewCar = inputColorCreate.value;

    await createCarAPI({ 'name': nameNewCar, 'color': colorNewCar });
    await updateCarList();
  });
}


export async function deleteCar() {
  const containerAllCar = <HTMLElement>document.querySelector('.container-all-car');

  containerAllCar?.addEventListener('click', async (event) => {
    const buttonRemove = (<HTMLElement>event.target)?.closest('.button-remove');
    if (!buttonRemove) return;

    const carContainer = buttonRemove.closest('.car-container') as HTMLElement;
    const carId = buttonRemove.getAttribute('data-remove');

    await deleteCarAPI(Number(carId));
    carContainer.remove();

    await updateCarList();
  });
}

// ПРОБЛЕМА. Машинки меняют цвет, но для изменения захватываются ВСЕ машинки, на select которых был клик

  export async function changeCar() {
    const selectButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-select');
    const containerAllCar: HTMLElement = document.querySelector('.container-all-car')!;
    const inputTextUpdate: HTMLInputElement = document.querySelector('.update-text-input')!;
    const inputColorUpdate: HTMLInputElement = document.querySelector('.update-color-input')!;
    const carsCount: HTMLElement = document.querySelector('.cars-count')!;
    const updateButton: HTMLButtonElement = document.querySelector('.update-button')!;

    selectButtons.forEach(button => {
      button.addEventListener('click', () => {
        inputTextUpdate.disabled = false;
        inputColorUpdate.disabled = false;
        updateButton.disabled = false;
      });
    });
    
    containerAllCar?.addEventListener('click', async (event) => {
      const buttonSelect = (<HTMLElement>event.target)?.closest('.button-select');
      if (!buttonSelect) return;
        updateButton.addEventListener('click', async () => {
          const carId = buttonSelect.getAttribute('data-select');
          console.log(carId)

      await updateCarAPI({ 'name': inputTextUpdate.value, 'color': inputColorUpdate.value }, Number(carId));

      const arr = await getCarsAPI(pageNumber);
      containerAllCar.innerHTML = '';
      carsCount.innerHTML = arr.length.toString();

      arr.forEach((car: { id: number; name: string; color: string; }) => {
        const carItem = createCarContainer(car.id, car.name, car.color);
        containerAllCar.appendChild(carItem);
      });
      countCars.count = arr.length;
      carsCount.innerHTML = `(${arr.length})`;
        })
    });

  }
