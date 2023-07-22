export const carsNames: Array<string> = [
    'Audi',
    'BMW',
    'Mercedes',
    'Volkswagen',
    'Ford',
    'Toyota',
    'Honda',
    'Nissan',
    'Chevrolet',
    'Hyundai',
    'Kia',
    'Mazda',
    'Subaru',
    'Volvo',
    'Jaguar',
    'Land Rover',
    'Tesla',
    'Porsche',
    'Ferrari',
    'Lamborghini'
];

export const carsModels: Array<string> = [
    'A3',
    'X5',
    'C-Class',
    'Golf',
    'Focus',
    'Corolla',
    'Civic',
    'Sentra',
    'Cruze',
    'Elantra',
    'Sportage',
    'CX-5',
    'Impreza',
    'S60',
    'F-Type',
    'Range Rover',
    'Model S',
    '911',
    '488 GTB',
    'Huracan'
  ];


  export const carsRandomColor: Array<string> = [
    "#ff0000",
    "#0000ff",
    "#00ff00",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8000",
    "#8000ff",
    "#00ff80",
    "#ff0080",
    "#80ff00",
    "#0080ff",
    "#ff80ff",
    "#80ffff",
    "#ff4000",
    "#4000ff",
    "#00ff40",
    "#ff0040",
    "#40ff00",
    "#0040ff"
];

export function getRandomCarName(): string {
    const randomCarNameIndex = Math.floor(Math.random() * carsNames.length);
    const randomCarModelIndex = Math.floor(Math.random() * carsModels.length);

    const randomCarName = carsNames[randomCarNameIndex];
    const randomCarModel = carsModels[randomCarModelIndex];

    return `${randomCarName} ${randomCarModel}`;
  }


  export function getRandomCarColor(): string {
    const randomCarColorIndex = Math.floor(Math.random() * carsRandomColor.length);
    const randomCarColor = carsRandomColor[randomCarColorIndex];
    return randomCarColor;
}
