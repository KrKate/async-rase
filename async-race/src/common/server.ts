export const server = 'http://127.0.0.1:3000';

export enum Path {
    GARAGE = 'garage',
    ENGINE = 'engine'
 }

export const garage = `${server}/${Path.GARAGE}`;
export const engine = `${server}/${Path.ENGINE}`;


export async function getCountOfCars() {
    const response = await fetch(garage, { method: 'GET' });
    const data = await response.json();
    console.log(data.length)
    return data.length;
}

getCountOfCars().then(length => {
    console.log(length);
});


// export let countAllCars = 0;

// export const getCarsAPI = async (page: number, limit = 7) => {
//   const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
//   countAllCars = Number(response.headers.get('X-Total-count'));

//   return response.json();
// };


// export const getCarAPI = async (id: number) => (await fetch(`${garage}/${id}`, { method: 'GET' })).json();
