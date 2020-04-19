import $ from 'jquery';
import './css/base.scss';
import './css/_media-queries.scss';
import Hotel from '../src/Hotel';
import BookingHandler from '../src/BookingHandler';
import {
  usersPromise,
  roomsPromise,
  bookingsPromise
} from "./utils.js";
import './images/hotel1.jpg'
const moment = require('moment');
import flatpickr from "flatpickr";

let data = {};
let bookingHandler;
let hotel;

Promise.all([usersPromise, roomsPromise, bookingsPromise]).then(response => data = {
    users: response[0],
    rooms: response[1],
    bookings: response[2],
  })
  .then(() => {
    bookingHandler = new BookingHandler(data.bookings);
    hotel = new Hotel(data.rooms, data.bookings);
  })
  .catch(error => {
    console.log(error);
  });

$('.title-wrapper').click(() => {
  window.location = './index.html';
});

$('#logout').click(() => {
  localStorage.clear();
  window.location = './index.html';
});

$('#user-login').click(() => {
  window.location = './user-login.html';
});

$('#admin-login').click(() => {
  window.location = './admin-login.html';
});

$('.booking-history').click(() => {
  $('.user').empty();
  emptyContainers();
  getUserData();
  showTime();
});

$('.admin-title-wrapper').click(() => {
  emptyContainers();
  $('.admin-info').empty();
  getAdminData();
  showTime();
});

$('.user-title-wrapper').click(() => {
  $('.user').empty();
  emptyContainers();
  getUserData();
  showTime();
});

$('.rooms').delegate('.book-btn', 'click', (e) => {
  let roomId = Number($(e.target).attr('id'));
  getBookingData(roomId);
})

function showTime() {
  $('.date').text(moment().format('L'));
}

$('#user-login-btn').click(() => {
  let username = $('#user-login-input');
  let password = $('#user-password-input');
  let customer = username.val().split('').splice(0, 8).join('');
  let customerId = Number(username.val().split('').splice(8).join(''));
  let user = findUser(customerId);

  if (user && password.val() === 'overlook2020' && customer === 'customer') {
    setLocalStorage(user, 'user');
    window.location = './user.html';
    getUserData();
  }

  if ((!user || customer !== 'customer') && password.val() === 'overlook2020') {
    username.val('');
    displayLoginError(username);
    resetLoginError(password);
  }

  if (user && customer === 'customer' && password.val() !== 'overlook2020') {
    password.val('');
    resetLoginError(username);
    displayLoginError(password);
  }

  if ((!user || customer !== 'customer') && password.val() !== 'overlook2020') {
    username.val('');
    password.val('');
    displayLoginError(username);
    displayLoginError(password);
  }
});

function findUser(customerId) {
  return data.users.find(user => user.id === customerId)
}

function setLocalStorage(item, key) {
  let stringified = JSON.stringify(item);
  localStorage.setItem(key, stringified);
}

function displayLoginError(input) {
  input.css('border', '1px #fc0015 solid');
}

function resetLoginError(input) {
  input.css('border', '1px #132E88 solid');
}

$('#admin-login-btn').click(() => {
  let username = $('#admin-login-input');
  let password = $('#admin-password-input');
  if (username.val() === 'manager' && password.val() === 'overlook2020') {
    window.location = './admin.html';
    // getAdminData();
  }

  if (username.val() !== 'manager' && password.val() === 'overlook2020') {
    username.val('');
    displayLoginError(username);
    resetLoginError(password);
  }

  if (username.val() === 'manager' && password.val() !== 'overlook2020') {
    password.val('');
    displayLoginError(password);
    resetLoginError(username);
  }

  if (username.val() !== 'manager' && password.val() !== 'overlook2020') {
    username.val('');
    password.val('');
    displayLoginError(username);
    displayLoginError(password);
  }
});

function getUserData() {
  let user = getLocalStorage('user');
  let userBookings = bookingHandler.findBookings(user.id);
  displayUserInfo(user, userBookings);
  displayUserBookings(userBookings);
  flatpickr('.date-input');
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function displayUserBookings(userBookings) {
  userBookings.forEach(booking => {
    hotel.rooms.forEach(room => {
      (room.number === booking.roomNumber) && displayBooking(booking, room);
    });
  });
}

function displayBooking(booking, room) {
  $('.user-bookings').prepend(`
  <section class="user-booking ${checkStatus(booking.date).toLowerCase()}" id="${booking.id}">
  <div class="left">
    <p>${checkStatus(booking.date)}</p>
    <p>${booking.date}</p>
    <p>$${room.costPerNight}/night</p>
  </div>
  <div class="right">
    <p>${room.roomType.toUpperCase()}</p>
    <p>bed size: ${room.bedSize}</p>
    <p>beds: ${room.numBeds}</p>
  </div>
  <button class="cancel-btn ${checkCancelAbility(booking.date)}" id="${booking.id}">CANCEL</button>
</section>
  `);
}

function checkCancelAbility(date) {
  let now = moment().format('YYYY/MM/DD');
  return ($('.page').text() === 'Admin Page' && date > now) ? 'cancel' : 'hidden';
}

function checkStatus(date) {
  let now = moment().format('YYYY/MM/DD');
  if (now < date) {
    return 'Upcoming';
  }

  if (now === date) {
    return 'Present';
  }

  if (now > date) {
    return 'Past';
  }
}

function getAdminData() {
  let today = moment().format('YYYY/MM/DD');
  displayRevenue(today);
  displayRoomsAvailable(today);
  displayRoomsBooked(today);
  displayRoomsOccupied(today);
  displayInfoMessage('Nothing to Display');
  flatpickr(".date-input");
}

function displayRevenue(today) {
  let revenue = hotel.calcRevenue(today);
  $('.admin-info').append(`
  <p>Today's</br> Revenue:</br><span>$${revenue}</span></p>
 `);
}

function displayRoomsAvailable(today) {
  let available = hotel.calcRoomsAvailable(today);
  $('.admin-info').append(`
  <p>Today's</br>Rooms Available:</br><span>${available}</span></p> 
 `);
}

function displayRoomsBooked(today) {
  let booked = hotel.calcRoomsBooked(today);
  $('.admin-info').append(`
  <p>Today's</br>Rooms Occupied:</br><span>${booked}</span></p>
 `)
}

function displayRoomsOccupied(today) {
  let occupied = hotel.calcRoomsOccupied(today);
  $('.admin-info').append(`
  <p>Today's</br> Rooms Occupied:</br><span>${occupied}%</span></p>
 `)
}

$('.search-user-btn').click(() => {
  $('.user').empty();
  emptyContainers();
  let input = $('.search-user-input').val().toLowerCase();
  searchUsers(input);
  $('.search-user-input').val('');
});

function searchUsers(input) {
  let foundUsers = [];
  data.users.forEach(user => {
    let name = user.name.toLowerCase();
    let splitName = name.split(' ');
    if (name === input) {
      foundUsers.push(user);
    } else if (input.includes(splitName[0]) || input.includes(splitName[1])) {
      foundUsers.push(user);
    }
  })
  checkExactMatch(foundUsers, input);
}

function checkExactMatch(foundUsers, input) {
  let foundUser;
  foundUsers.forEach(user => {
    (user.name.toLowerCase() === input) && (foundUser = user);
  });
  foundUser && getUserInfo(foundUser);
  !foundUser && checkMatch(foundUsers);
}

function checkMatch(foundUsers) {
  (foundUsers.length === 0) && displayInfoMessage('User Not Found');
  (foundUsers.length === 1) && getUserInfo(foundUsers[0]);
  (foundUsers.length > 1) && chooseUser(foundUsers);
}

function getUserInfo(user) {
  setLocalStorage(user, 'user');
  let userBookings = bookingHandler.findBookings(user.id);
  displayUserBookings(userBookings);
  displayUserInfo(user, userBookings)
}

function displayInfoMessage(message, color) {
  emptyContainers();
  $('.info').append(`
  <div class="user-data">
  <p class="message" id="${color}">${message}</p>
  </div>
  `)
}

function chooseUser(users) {
  users.forEach(user => displayUserChoice(user))
}

function displayUserChoice(user) {
  $('.info').append(`
  <div class="user-choice" id="${user.id}">
    <p id="${user.id}">Name: ${user.name}</p>
    <p id="${user.id}">Id: ${user.id}</p>
  </div>
  `)
}

$('.info').delegate('.user-choice', 'click', (e) => {
  let id = Number($(e.target).attr('id'));
  let user = findUser(id);
  setLocalStorage(user, 'user');
  emptyContainers();
  getUserInfo(user);
})

function displayUserInfo(user, userBookings) {
  let amount = hotel.getBookingsAmount(userBookings).toFixed(2);
  $('.user').append(`
  <div class="user-data">
  <p>Customer: ${user.name}</p>
  <p>Total Spending: $${amount}</p>
  <button class="user-history">user's booking history</button>
  </div>
 `)
}

$('.user').delegate('.user-history', 'click', (e) => {
  $('.user').empty();
  emptyContainers();
  let user = getLocalStorage('user');
  getUserInfo(user);
})


$('.date-btn').click(() => {
  emptyContainers();
  let date = convertDate();
  checkDate(date);
  flatpickr('.date-input');
});

function checkDate(date) {
  let now = moment().format('YYYY/MM/DD');
  return (date >= now) ? getRoomsForDate(date) : displayInfoMessage('Select Upcoming Date');
}

function getRoomsForDate(date) {
  displayInfoMessage(`Rooms available: ${date}`)
  let rooms = hotel.getRoomsAvailable(date);
  (date === '') && displayInfoMessage('All Rooms / No Date Selected');
  !rooms && displayInfoMessage('No Rooms Available on Selected Date');
  rooms && displayRooms(rooms, date);
}

function convertDate() {
  let date = $(".date-input").val().split('');
  let converted = [];
  date.forEach(num => {
    (num === '-') ? converted.push('/'): converted.push(num);
  })
  return converted.join('');
}

function displayRooms(rooms, date) {
  getRoomsType(date);
  rooms.forEach(room => displayRoom(room, date));
}

function displayRoom(room, date) {
  $('.rooms').append(`
  <section class="room ${checkRoomType(room)} ${room.number}" id="${date}">
  <div class="left">
    <p>${room.roomType.toUpperCase()}</p>
    <p>${room.number}</p>
    <p>${room.costPerNight}$/night</p>
  </div>
  <div class="right">
    <p>bed size: ${room.bedSize}</p>
    <p>beds: ${room.numBeds}</p>
    <p>bidet: ${room.bidet}</p>
  </div>
  <button class="book-btn" id="${room.number}">BOOK</button>
</section>
  `);
}

function checkRoomType(room) {
  if (room.roomType === 'residential suite') {
    return 'residential';
  }

  if (room.roomType === 'suite') {
    return 'suite';
  }

  if (room.roomType === 'single room') {
    return 'single';
  }

  if (room.roomType === 'junior suite') {
    return 'junior';
  }
}

function emptyContainers() {
  $('.user-bookings').empty();
  $('.rooms').empty();
  $('.info').empty();
  $('.rooms-type').empty();
}

function getRoomsType(date) {
  setLocalStorage(hotel.filterRoomsByType(date, 'residential suite'), 'residential');
  setLocalStorage(hotel.filterRoomsByType(date, 'suite'), 'suite');
  setLocalStorage(hotel.filterRoomsByType(date, 'single room'), 'single');
  setLocalStorage(hotel.filterRoomsByType(date, 'junior suite'), 'junior');
  displayRoomType(date);
}

function displayRoomType(date) {
  $('.rooms-type').attr('id', date);
  $('.rooms-type').append(`
    <button class="type" id="residential">residential suite</button>
    <button class="type" id="suite">suite</button>
    <button class="type" id="single">single room</button>
    <button class="type" id="junior">junior suite</button>
    <button class="type" id="all-types">all room types</button>
  `)
}

$('.rooms-type').delegate('.type', 'click', (e) => {
  let date = $('.rooms-type').attr('id');
  let key = $(e.target).attr('id');
  let rooms = getLocalStorage(key);
  (rooms.length >= 1) ? getRoomTypeInfo(rooms, key, date): displayRoomsNotFound(date, key);
})

function getRoomTypeInfo(rooms, key, date) {
  let type = rooms[0].roomType.toUpperCase();
  emptyContainers();
  let message = `${type} Available ${date}`;
  displayInfoMessage(message, key)
  displayRooms(rooms, date);
}

function displayRoomsNotFound(date, key) {
  $('.rooms').empty();
  $('.info').empty()
  $('.info').append(`
  <div class="user-data">
  <p class="message" id="${key}">Selected Room Type Not Available ${date}</p>
  </div>
  `)
}

function getBookingData(roomId) {
  let day = $('.rooms-type').attr('id');
  let user = getLocalStorage('user');
  let bookingId = Date.now().toString();
  user ? bookRoom(bookingId, user.id, day, roomId) : alert('selectUser')
}

function bookRoom(bookingId, userId, day, roomId) {
  console.log('booking id', bookingId);
  console.log('booking day', day);
  console.log('userId', userId);
  console.log('roomId', roomId);
  // bookingHandler.book(bookingId, userId, day, roomId);
}