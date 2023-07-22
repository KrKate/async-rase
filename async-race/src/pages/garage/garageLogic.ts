import {createCarAPI, getCarsAPI, pageNumber, countCars, deleteCarAPI, updateCarAPI} from "../../common/server";
import createCarContainer from "./createCar";

const updateCarList = async () => {
  const containerAllCar = <HTMLElement>document.querySelector('.container-all-car');
  const carsCount = <HTMLElement>document.querySelector('.cars-count');

  const { totalCount, data } = await getCarsAPI(pageNumber.number);
  containerAllCar.innerHTML = '';
  carsCount.innerHTML = totalCount.toString();

  data.forEach((car: { id: number; name: string; color: string; }) => {
    const carItem = createCarContainer(car.id, car.name, car.color);
    containerAllCar.appendChild(carItem);
  });
  countCars.count = totalCount;
  carsCount.innerHTML = `(${totalCount} cars)`;
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
// добавить флаг isSelected = true/false. После изменения конкретно машины переключать для нее на false?

  export async function changeCar() {
    const selectButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-select');
    const containerAllCar = <HTMLElement>document.querySelector('.container-all-car')!;
    const inputTextUpdate = <HTMLInputElement>document.querySelector('.update-text-input')!;
    const inputColorUpdate = <HTMLInputElement>document.querySelector('.update-color-input')!;
    const carsCount  = <HTMLElement>document.querySelector('.cars-count')!;
    const updateButton = <HTMLButtonElement>document.querySelector('.update-button');

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

      const { totalCount, data } = await getCarsAPI(pageNumber.number);
      containerAllCar.innerHTML = '';
      carsCount.innerHTML = totalCount.toString();

      data.forEach((car: { id: number; name: string; color: string; }) => {
        const carItem = createCarContainer(car.id, car.name, car.color);
        containerAllCar.appendChild(carItem);
      });
      countCars.count = totalCount;
      carsCount.innerHTML = `(${totalCount} cars)`;
        })
    });
  }


export async function pagination() {
    const prev = <HTMLButtonElement>document.querySelector('.garage-prev-button');
    const next = <HTMLButtonElement>document.querySelector('.garage-next-button');
    const number = <HTMLElement>document.querySelector('h4');
    next?.addEventListener('click', async () => {
      pageNumber.number += 1;
      await updateCarList();
      number.textContent = `Page #${pageNumber.number}`
    })

   prev?.addEventListener('click', async () => {
      pageNumber.number -= 1;
      await updateCarList();
      number.textContent = `Page #${pageNumber.number}`
    })
  }
