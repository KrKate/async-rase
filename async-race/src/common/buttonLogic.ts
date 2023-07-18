import { createCarAPI, updateCars } from "./server";


async function createNewCar() {
  //  const containerAllCar = <HTMLInputElement>document.querySelector('.container-all-car');
    const inputTextCreate = <HTMLInputElement>document.querySelector('.create-text-input');
    const inputColorCreate = <HTMLInputElement>document.querySelector('.create-color-input');
    const createButton = document.querySelector('.create-button');
  
    createButton?.addEventListener('click', async () => {
      const nameNewCar =  inputTextCreate.value;
      const colorNewCar =  inputColorCreate.value;
    //   containerAllCar.innerHTML = '';
      console.log('work')
      await createCarAPI({ 'name': nameNewCar, 'color': colorNewCar });
      updateCars(); 
    //   location.reload()
    });
  }

  export default createNewCar;
