import sprite from "./sprite";

class GaragePage {
    private container: HTMLElement;

    static TextObject = {
        GarageTitle: 'Garage'
    }

    constructor(id: string) {
        this.container = document.createElement('div');
        this.container.id = id;
    }

 createHeaderTitle(text: string) {
  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  const headerTitle = document.createElement('h1');
  headerTitle.innerText = text;

  const carsCount = document.createElement('div');
  carsCount.innerText = `(4)`;

  headerContainer.append(headerTitle, carsCount);
  return headerContainer;
}


    private createButton(text: string, className: string) {
        const button = document.createElement('button');
        button.innerText = text;
        button.className = className;
        return button;
    }

    private createInput(type: string, className: string, value?: string | undefined | null) {
        const input = document.createElement('input');
        input.type = type;
        input.className = className;
        input.value = value || "";
        return input;
    }

    private createSettings() {
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'settings-container';

        const settingsCreateContainer = document.createElement('div');
        settingsCreateContainer.className = 'settings-create-container';
        const createTextInput = this.createInput('text', 'create-text-input');
        const createColorInput = this.createInput('color', 'create-color-input', '#ffffff');
        const createButton = this.createButton('Create', 'create-button');
        settingsCreateContainer.append(createTextInput, createColorInput, createButton);

        const settingsUpdateContainer = document.createElement('div');
        settingsUpdateContainer.className = 'settings-update-container';
        const updateTextInput = this.createInput('text', 'update-text-input');
        const updateColorInput = this.createInput('color', 'update-color-input', '#ffffff');
        const updateButton = this.createButton('Update', 'update-button');
        settingsUpdateContainer.append(updateTextInput, updateColorInput, updateButton);

        const settingsButtonsContainer = document.createElement('div');
        settingsButtonsContainer.className = 'settings-buttons-container';
        const buttonRace = this.createButton('RACE', 'button-race');
        const buttonReset = this.createButton('RESET', 'button-reset');
        const buttonGenerate = this.createButton('GENERATE CARS', 'button-generate');
        settingsButtonsContainer.append(buttonRace, buttonReset, buttonGenerate);

        settingsContainer.append(settingsCreateContainer, settingsUpdateContainer, settingsButtonsContainer);
        return settingsContainer;
    }

    createCarContainer(id: number, name: string, color: string) {
        const carContainer = document.createElement('div');
        carContainer.className = 'car-container';

        const carsControl = document.createElement('div');
        carsControl.className = `cars-control`;

        const racingTrack = document.createElement('div');
        racingTrack.className = 'racing-track';

        const buttonSelect = this.createButton('SELECT', 'button-select');
        const buttonRemove = this.createButton('REMOVE', 'button-remove');
        const carName = document.createElement('div');
        carName.innerText = `${name}`;
        carsControl.append(buttonSelect, buttonRemove, carName);

        const buttonStart = this.createButton('A', 'button-start');
        const buttonStop = this.createButton('B', 'button-stop');
        const carImage = document.createElement('div');
        carImage.innerHTML = `${sprite}
        <svg class='image' fill="${color}">
          <use xlink:href="#car-img"></use>
        </svg>
        `
        racingTrack.append(buttonStart, buttonStop, carImage);

        carContainer.append(carsControl, racingTrack);
        return carContainer;
      }


    render() {
        const title = this.createHeaderTitle(GaragePage.TextObject.GarageTitle);
        const settings = this.createSettings();
        const car = this.createCarContainer(1, '1', '#ff0fff');
        this.container.append( settings, title, car);

        return this.container
    }
}

export default GaragePage;
