import createButton from "./createButton";
import sprite from "../pages/garage/sprite";

function createCarContainer(id: number, name: string, color: string) {
    const carContainer = document.createElement('div');
    carContainer.className = 'car-container';

    const carsControl = document.createElement('div');
    carsControl.className = `cars-control`;

    const racingTrack = document.createElement('div');
    racingTrack.className = 'racing-track';

    const buttonSelect = createButton('SELECT', 'button-select');
    const buttonRemove = createButton('REMOVE', 'button-remove');
    const carName = document.createElement('div');
    carName.innerText = `${name}`;
    carsControl.append(buttonSelect, buttonRemove, carName);

    const buttonStart = createButton('A', 'button-start');
    const buttonStop = createButton('B', 'button-stop');
    const carImage = document.createElement('span');
    carImage.className = 'car-img';
    carImage.innerHTML = `${sprite}
    <svg class='image' fill="${color}">
      <use xlink:href="#car-img"></use>
    </svg>
    `
    const flag = document.createElement('span');
    flag.className = 'flag';
    racingTrack.append(buttonStart, buttonStop, carImage, flag);

    carContainer.append(carsControl, racingTrack);
    return carContainer;
  }

 export default createCarContainer;


