import createButton from "../../common/createButton";
import sprite from "./sprite";


function createCarContainer(id: number, name: string, color: string) {
    const carContainer = document.createElement('div');
    carContainer.className = 'car-container';
    carContainer.id = id.toString();

    const carsControl = document.createElement('div');
    carsControl.className = `cars-control`;

    const racingTrack = document.createElement('div');
    racingTrack.className = 'racing-track';

    const buttonSelect = createButton('SELECT', 'button-select');
    buttonSelect.setAttribute('data-select', id.toString());

    const buttonRemove = createButton('REMOVE', 'button-remove');
    buttonRemove.setAttribute('data-remove', id.toString());

    const carName = document.createElement('div');
    carName.innerText = `${name}`;
    carsControl.append(buttonSelect, buttonRemove, carName);

    const buttonStart = createButton('A', 'button-start');
    buttonStart.setAttribute('data-start', id.toString());


    const buttonStop = createButton('B', 'button-stop');
    buttonStop.setAttribute('data-stop', id.toString());
    buttonStop.disabled = true;


    const carImage = document.createElement('span');
    carImage.className = 'car-img';
    carImage.id = `carImg-${id}`;
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


