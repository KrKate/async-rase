import createCarContainer from "../pages/garage/createCar";
import { createTable } from "../pages/winners/createWinnerTable";

enum Path {
    SERVER = 'http://127.0.0.1:3000',
    GARAGE = 'garage',
    WINNERS = 'winners',
    ENGINE = 'engine'
 }

 export const pageNumber = {
  numberGaragePage: 1,
  numberWinnerPage: 1
}

export const countCars = {
    count: 0
};
export const countWinners = {
  countWins: 0,  // количество побед конкретной машинки из API (в столбце wins)
  numberOfWinners: 0  // количество машинок в победителях
};


const garage = `${Path.SERVER}/${Path.GARAGE}`;
const winners = `${Path.SERVER}/${Path.WINNERS}`;
const engine = `${Path.SERVER}/${Path.ENGINE}`;


export const getCarByID = async (id: number) => {
  const response = await fetch(`${garage}/${id}, { method: 'GET' }`);
  const data = await response.json();
  return data;
};


export const getCarsAPI = async (page: number, limit: number = 7) => {
   const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
   const totalCount = Number(response.headers.get('X-Total-count'));
   const data = await response.json();
   return { totalCount, data };
};


export const getWinnersAPI = async (page: number, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}`, { method: 'GET' });
  countWinners.countWins = Number(response.headers.get('X-Total-count'));
  return response.json();
};



export async function updateCars() {
  const { totalCount, data } = await getCarsAPI(pageNumber.numberGaragePage);
  const containerAllCar = document.createElement('div');
  containerAllCar.className = 'container-all-car';
  containerAllCar.innerHTML = '';
  data.forEach((car: { id: number; name: string; color: string; }) => {
      const carItem = createCarContainer(car.id, car.name, car.color);
      containerAllCar.appendChild(carItem);
  });
  countCars.count = totalCount;
  return containerAllCar;
}

export async function getWinners() {
  const arr = await getWinnersAPI(pageNumber.numberWinnerPage);
  const containerAllWinners = document.createElement('div');
  containerAllWinners.className = 'container-all-win';
  containerAllWinners.innerHTML = '';
  let count = 0;
  arr.forEach((win: { id: number; wins: number; time: number; count: number }) => {
    count += 1;
      const winItem = createTable(win.id, win.wins, win.time, count);
      containerAllWinners.appendChild(winItem);
  });
  countWinners.numberOfWinners = arr.length;
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



export const startEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();


export const driveModeEngine = async (id: number) => {
  try {
    const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' });
    if (res.status === 200) {
      return await res.json();
    } 
      return { success: false };
    
  } catch (error) {
    console.error('Oh no! Something went wrong');
    return { success: false };
  }
};
