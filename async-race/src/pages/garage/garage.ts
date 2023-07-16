import createButton from "../../common/createButton";
// import createCarContainer from "../../common/createCar";
import updateCars from "../../common/server";

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

    public createInput(type: string, className: string, value?: string | undefined | null) {
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
        const createBtn = createButton('Create', 'create-button');
        settingsCreateContainer.append(createTextInput, createColorInput, createBtn);

        const settingsUpdateContainer = document.createElement('div');
        settingsUpdateContainer.className = 'settings-update-container';
        const updateTextInput = this.createInput('text', 'update-text-input');
        const updateColorInput = this.createInput('color', 'update-color-input', '#ffffff');
        const updateButton = createButton('Update', 'update-button');
        settingsUpdateContainer.append(updateTextInput, updateColorInput, updateButton);

        const settingsButtonsContainer = document.createElement('div');
        settingsButtonsContainer.className = 'settings-buttons-container';
        const buttonRace = createButton('RACE', 'button-race');
        const buttonReset = createButton('RESET', 'button-reset');
        const buttonGenerate = createButton('GENERATE CARS', 'button-generate');
        settingsButtonsContainer.append(buttonRace, buttonReset, buttonGenerate);

        settingsContainer.append(settingsCreateContainer, settingsUpdateContainer, settingsButtonsContainer);
        return settingsContainer;
    }

    async render() {
        const title = this.createHeaderTitle(GaragePage.TextObject.GarageTitle);
        const settings = this.createSettings();
        const car = await updateCars();
        this.container.append( settings, title, car);

        return this.container
    }
}

export default GaragePage;
