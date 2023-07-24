import { startEngine, driveModeEngine } from "../../common/server";

let time: number;
const carPositionPercentage = 0.23;



// export function carStopB() {
//     const containerAllCar = <HTMLElement>document.querySelector('.container-all-car');
//     containerAllCar?.addEventListener('click', async (event) => {
//         const buttonStop = (<HTMLElement>event.target)?.closest('.button-stop')
//      });

// }

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
    startEngine(idCar).then((car) => {
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
    });
  };


  export async function carStart() {
    const containerAllCar = document.querySelector('.container-all-car');
    containerAllCar?.addEventListener('click', async (event) => {
      const buttonStart = event.target as HTMLElement;
      const idCar = buttonStart?.dataset.start;
      console.log(idCar);
      start(Number(idCar));
    });
  }

  export default carStart;
