import createCarContainer from "./createCar";
import { createTable } from "../pages/winners/createWinnerTable";

enum Path {
    SERVER = 'http://127.0.0.1:3000',
    GARAGE = 'garage',
    WINNERS = 'winners',
    ENGINE = 'engine'
 }

export const pageNumber = 1;
export const countCars = {
    count: 0
};
export const countWins = {
  count: 0
};


const garage = `${Path.SERVER}/${Path.GARAGE}`;
const winners = `${Path.SERVER}/${Path.WINNERS}`;


export const getCarsAPI = async (page: number, limit: number = 7) => {
   const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
   return response.json();
};


export const getWinnersAPI = async (page: number, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}`, { method: 'GET' });
  countWins.count = Number(response.headers.get('X-Total-count'));
  return response.json();
};



export async function updateCars() {
    const arr = await getCarsAPI(pageNumber);
    const containerAllCar = document.createElement('div');
    containerAllCar.className = 'container-all-car';
    containerAllCar.innerHTML = '';
    arr.forEach((car: { id: number; name: string; color: string; }) => {
        const carItem = createCarContainer(car.id, car.name, car.color);
        containerAllCar.appendChild(carItem);
    });
    countCars.count = arr.length;
    return containerAllCar;
}


export async function getWinners() {
  const arr = await getWinnersAPI(pageNumber);
  const containerAllWinners = document.createElement('div');
  containerAllWinners.className = 'container-all-win';
  containerAllWinners.innerHTML = '';
  arr.forEach((win: { id: number; wins: number; time: number }) => {
      const winItem = createTable(win.id, win.wins, win.time);
      containerAllWinners.appendChild(winItem);
  });
  return containerAllWinners;
}

export const createCarAPI = async (body: object) => {
    fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    updateCars();
  };


export const deleteCarAPI = async (id: number) => {
  await fetch(`${garage}/${id}`, {
    method: 'DELETE'
  });
};


export const updateCarAPI = async (body: object, id: number) => {
  await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};
