import { startEngine, driveModeEngine, stopEngine } from "../../common/server";

let time: number;
const carPositionPercentage = 0.23;


export type СarInfo = {
    [key: string | number]: number | string,
    id: number,
    name: string,
    color: string,
    wins: number,
    time: number
  };
const infoAnimation: { [id: number] : СarInfo; } = {};

function animation(car: HTMLElement, distance: number, duration: number) {
  let startTime = 0;
  const animationHandle: СarInfo = {
    id: 0,
    name: '',
    color: '',
    wins: 0,
    time: 0
  };
  const theCar = car;

  function moveCar(currentTime: number) {
    if (!startTime) {
      startTime = currentTime;
    }
    const timePassed = (currentTime - startTime) / duration;
    const translate = timePassed * distance;
    const translateXValue = `${translate}px`;
    theCar.style.transform = `translateX(${translateXValue})`;
    if (timePassed < 1) {
      animationHandle.id = window.requestAnimationFrame(moveCar);
    }
  }
  animationHandle.id = window.requestAnimationFrame(moveCar);
  return animationHandle;
}

  const start = async (idCar: number) => {
    const car = await startEngine(idCar);
    const velocity = Number(car.velocity);
    const distance = Number(car.distance);
    time = distance / velocity;

    const carImg = <HTMLElement>document.querySelector(`#carImg-${idCar}`);
    const screenWidth = document.body.clientWidth;
    const positionCar = screenWidth * carPositionPercentage;
    const distanceAnimation = screenWidth - positionCar;

    infoAnimation[idCar] = animation(carImg, distanceAnimation, time);

    driveModeEngine(idCar).then((drive) => {
      if (!drive.success) {
        window.cancelAnimationFrame(infoAnimation[idCar].id);
      }
    });
  };


   const stop = async (idCar: number) => {
    await stopEngine(idCar);
    window.cancelAnimationFrame(infoAnimation[idCar].id);
    const carImg = <HTMLElement>document.querySelector(`#carImg-${idCar}`);
    carImg.style.transform = 'translateX(0px)';
  };


// ПРОБЛЕМА. Визуально всё работает, но в консоль сыпятся ошибки 404 (id NaN)
// РЕШЕНО. Помогла проверка на isNaN

  export async function carStart() {
    const containerAllCar = document.querySelector('.container-all-car');
    containerAllCar?.addEventListener('click', async (event) => {
      const buttonStart = event.target as HTMLButtonElement;
      const idCar = buttonStart?.dataset.start;
      if (!Number.isNaN(Number(idCar)) && (Number(idCar))) {
        await start(Number(idCar));
        const btnStart = document.querySelector(`[data-start='${idCar}']`) as HTMLButtonElement;
        const btnStop = document.querySelector(`[data-stop='${idCar}']`) as HTMLButtonElement;
        btnStart.disabled = true;
        btnStop.disabled = false;
      }
    });
  }


  export async function carStop() {
    const containerAllCar = document.querySelector('.container-all-car');
    containerAllCar?.addEventListener('click', async (event) => {
      const buttonStop = event.target as HTMLButtonElement;
      const idCar = buttonStop?.dataset.stop;
      if (!Number.isNaN(Number(idCar)) && (Number(idCar))) {
        await stop(Number(idCar));
        const btnStart = document.querySelector(`[data-start='${idCar}']`) as HTMLButtonElement;
        const btnStop = document.querySelector(`[data-stop='${idCar}']`) as HTMLButtonElement;
        btnStop.disabled = true;
        btnStart.disabled = false;
      }
    });
  }

