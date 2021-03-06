const url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
const usersUrl = `${url}users/users`;
const roomsUrl = `${url}rooms/rooms`;
export const bookingsUrl = `${url}bookings/bookings`;
export const usersPromise = fetchData(usersUrl, 'users');
export const roomsPromise = fetchData(roomsUrl, 'rooms');
export let bookingsPromise = fetchData(bookingsUrl, 'bookings');

export function fetchData(url, type) {
  return fetch(url).then(response => response.json()).then(data => data[type]);
}