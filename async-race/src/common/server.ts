import createCarContainer from "./createCar";

enum Path {
    SERVER = 'http://127.0.0.1:3000',
    GARAGE = 'garage',
    ENGINE = 'engine'
 }

const garage = `${Path.SERVER}/${Path.GARAGE}`;

const getCarsAPI = async (page: number, limit: number = 7) => {
   const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
   return response.json();
};

const pageNumber = 1;

async function updateCars() {
    const arr = await getCarsAPI(pageNumber);
    const containerAllCar = document.createElement('div');
    containerAllCar.innerHTML = '';
    arr.forEach((car: { id: number; name: string; color: string; }) => {
        const carItem = createCarContainer(car.id, car.name, car.color);
        containerAllCar.appendChild(carItem);
    });
    return containerAllCar;
}

export default updateCars;
