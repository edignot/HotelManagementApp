import $ from 'jquery';
import './css/base.scss';
import './css/_media-queries.scss';
import Hotel from '../src/Hotel';
import BookingHandler from '../src/BookingHandler';
import flatpickr from 'flatpickr';
import moment from 'moment';
import {
  usersPromise,
  roomsPromise,
  bookingsPromise
} from "./utils.js";

let data = {};
let bookingHandler, hotel;
let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings';

Promise.all([usersPromise, roomsPromise, bookingsPromise])
  .then(response => data = {
    users: response[0],
    rooms: response[1],
    bookings: response[2],
  })
  .then(() => {
    bookingHandler = new BookingHandler(url);
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

$('.forgot-password').click(() => {
  alert('Please Contact Overlook Hotel')
});

$('#user-enter').click(() => {
  removeHidden('user');
  getUserData();
  showTime();
});

$('#admin-enter').click(() => {
  removeHidden('admin');
  getAdminData();
  showTime();
});

$('.admin-title-wrapper').click(() => {
  $('.admin-info').empty();
  emptyContainers();
  getAdminData();
  showTime();
});

$('.user-title-wrapper').click(() => {
  $('.user').empty();
  emptyContainers();
  getUserData();
  showTime();
});

$('.booking-history').click(() => {
  $('.user').empty();
  emptyContainers();
  getUserData();
  showTime();
});

$('.date-btn').click(() => {
  emptyContainers();
  let date = convertDateNow();
  checkDate(date);
  flatpickr('.date-input');
});

$('.rooms').delegate('.book-btn', 'click', (e) => {
  let roomId = Number($(e.target).attr('id'));
  getBookingData(roomId);
});

$('.user-bookings').delegate('.cancel-btn', 'click', (e) => {
  let bookingId = Number($(e.target).attr('id'));
  cancelBooking(bookingId);
});

$('.user').delegate('.user-history', 'click', () => {
  $('.user').empty();
  emptyContainers();
  let user = getLocalStorage('user');
  getUserInfo(user);
});

$('.info').delegate('.user-choice', 'click', (e) => {
  let id = Number($(e.target).attr('id'));
  let user = findUser(id);
  setLocalStorage(user, 'user');
  emptyContainers();
  getUserInfo(user);
});

$('.rooms-type').delegate('.type', 'click', (e) => {
  let date = $('.rooms-type').attr('id');
  let key = $(e.target).attr('id');
  let rooms = getLocalStorage(key);
  searchRoomType(date, key, rooms);
});

$('#user-login-btn').click(() => {
  let username = $('#user-login-input');
  let password = $('#user-password-input');
  let correctPassword = 'overlook2020';
  let customer = verifyCustomer(username);
  let customerId = verifyUserId(username);
  let user = findUser(customerId);

  if (user && password.val() === correctPassword &&
    customer === 'customer') {
    setLocalStorage(user, 'user');
    window.location = './user.html';
  }

  if ((!user || customer !== 'customer') &&
    password.val() === correctPassword) {
    username.val('');
    displayLoginError(username);
    resetLoginError(password);
  }

  if (user && customer === 'customer' &&
    password.val() !== correctPassword) {
    password.val('');
    resetLoginError(username);
    displayLoginError(password);
  }

  if ((!user || customer !== 'customer') &&
    password.val() !== correctPassword) {
    username.val('');
    password.val('');
    displayLoginError(username);
    displayLoginError(password);
  }
});

$('#admin-login-btn').click(() => {
  let username = $('#admin-login-input');
  let password = $('#admin-password-input');
  let correctPassword = 'overlook2020';
  if (username.val() === 'manager' &&
    password.val() === correctPassword) {
    window.location = './admin.html';
  }

  if (username.val() !== 'manager' &&
    password.val() === correctPassword) {
    username.val('');
    displayLoginError(username);
    resetLoginError(password);
  }

  if (username.val() === 'manager' &&
    password.val() !== correctPassword) {
    password.val('');
    displayLoginError(password);
    resetLoginError(username);
  }

  if (username.val() !== 'manager' &&
    password.val() !== correctPassword) {
    username.val('');
    password.val('');
    displayLoginError(username);
    displayLoginError(password);
  }
});

function verifyCustomer(username) {
  return username.val().split('').splice(0, 8).join('');
}

function verifyUserId(username) {
  return Number(username.val().split('').splice(8).join(''));
}

function findUser(customerId) {
  return data.users.find(user => user.id === customerId);
}

function displayLoginError(input) {
  input.css('border', '1px #fc0015 solid');
}

function resetLoginError(input) {
  input.css('border', '1px #132E88 solid');
}

function setLocalStorage(item, key) {
  let stringified = JSON.stringify(item);
  localStorage.setItem(key, stringified);
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function removeHidden(type) {
  $(`.${type}-header`).removeClass('hidden');
  $(`.${type}-main`).removeClass('hidden');
  $(`.${type}-footer`).removeClass('hidden');
  $(`.${type}-entry`).addClass('hidden');
}

function showTime() {
  $('.date').text(moment().format('L'));
}

function getUserData() {
  let user = getLocalStorage('user');
  let userBookings = hotel.findBookings(user.id);
  displayUserInfo(user, userBookings);
  displayUserBookings(userBookings);
  flatpickr('.date-input');
}

function displayUserBookings(userBookings) {
  userBookings.forEach(booking => {
    hotel.rooms.forEach(room => {
      (room.number === booking.roomNumber) &&
      getDisplayBooking(booking, room);
    });
  });
}

function getDisplayBooking(booking, room) {
  let status = checkStatus(booking.date);
  let cancel = checkCancelAbility(booking.date);
  displayBooking(booking, room, status, cancel);
}

function displayBooking(booking, room, status, cancel) {
  $('.user-bookings').prepend(`
  <section class="user-booking ${status.toLowerCase()}" id="${booking.id}">
    <div class="left">
      <p>${status}</p>
      <p>${booking.date}</p>
      <p>$${room.costPerNight}/night</p>
    </div>
    <div class="right">
      <p>${room.roomType.toUpperCase()}</p>
      <p>bed size: ${room.bedSize}</p>
      <p>beds: ${room.numBeds}</p>
    </div>
    <button class="cancel-btn ${cancel}" id="${booking.id}">CANCEL</button>
  </section>
  `);
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

function checkCancelAbility(date) {
  let now = moment().format('YYYY/MM/DD');
  return ($('.admin-page').text().includes('Admin') && date > now) ?
    'cancel' : 'hidden';
}

function getAdminData() {
  let today = moment().format('YYYY/MM/DD');
  getRevenue(today);
  getRoomsAvailable(today);
  getRoomsBooked(today);
  getRoomsOccupied(today);
  displayInfoMessage('Nothing to Display');
  flatpickr(".date-input");
}

function getRevenue(today) {
  let revenue = hotel.calcRevenue(today);
  displayRevenue(revenue);
}

function displayRevenue(revenue) {
  $('.admin-info').append(`
  <p>Today's</br> Revenue:</br><span>$${revenue}</span></p>
 `);
}

function getRoomsAvailable(today) {
  let available = hotel.calcRoomsAvailable(today);
  displayRoomsAvailable(available);
}

function displayRoomsAvailable(available) {
  $('.admin-info').append(`
  <p>Today's</br>Rooms Available:</br><span>${available}</span></p> 
 `);
}

function getRoomsBooked(today) {
  let booked = hotel.getBookingsByDate(today).length;
  displayRoomsBooked(booked);
}

function displayRoomsBooked(booked) {
  $('.admin-info').append(`
  <p>Today's</br>Rooms Occupied:</br><span>${booked}</span></p>
 `);
}

function getRoomsOccupied(today) {
  let occupied = hotel.calcRoomsBooked(today);
  displayRoomsOccupied(occupied);
}

function displayRoomsOccupied(occupied) {
  $('.admin-info').append(`
  <p>Today's</br> Rooms Occupied:</br><span>${occupied}%</span></p>
 `);
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
    (name === input) && foundUsers.push(user);
    (input.includes(splitName[0]) || input.includes(splitName[1])) &&
    foundUsers.push(user)
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
  let userBookings = hotel.findBookings(user.id);
  displayUserBookings(userBookings);
  displayUserInfo(user, userBookings);
}

function displayInfoMessage(message, color) {
  emptyContainers();
  $('.info').append(`
  <div class="user-data">
    <p class="message" id="${color}">${message}</p>
  </div>
  `);
}

function chooseUser(users) {
  users.forEach(user => displayUserChoice(user));
}

function displayUserChoice(user) {
  $('.info').append(`
  <div class="user-choice" id="${user.id}">
    <p id="${user.id}">Name: ${user.name}</p>
    <p id="${user.id}">Id: ${user.id}</p>
  </div>
  `);
}

function displayUserInfo(user, userBookings) {
  $('.page').html(`Welcome back, ${user.name} &#128153`);
  let amount = hotel.getBookingsAmount(userBookings).toFixed(2);
  $('.user').append(`
  <div class="user-data">
    <p>Customer: ${user.name}</p>
    <p>Total Spending: $${amount}</p>
    <button class="user-history ${checkAdmin()}">user's booking history</button>
  </div>
 `);
}

function checkAdmin() {
  return ($('.admin-page').text().includes('Admin')) ? '' : 'hidden';
}

function checkDate(date) {
  let now = moment().format('YYYY/MM/DD');
  return (date >= now) ? getRoomsForDate(date) :
    displayInfoMessage('Select Upcoming Date');
}

function getRoomsForDate(date) {
  displayInfoMessage(`Rooms available: ${date}`)
  let rooms = hotel.getRoomsAvailable(date);
  (date === '') && displayInfoMessage('All Rooms / No Date Selected');
  if (rooms.length === 0) {
    displayInfoMessage('No Rooms Available on Selected Date');
  } else {
    displayRooms(rooms, date);
  }
}

function convertDateNow() {
  let date = $(".date-input").val().split('');
  let converted = [];
  date.forEach(num => {
    num === '-' ? converted.push('/') : converted.push(num);
  });
  return converted.join('');
}

function displayRooms(rooms, date) {
  getRoomsType(date, rooms);
  rooms.forEach(room => displayRoom(room, date));
}

function displayRoom(room, date) {
  let type = checkRoomType(room);
  $('.rooms').append(`
  <section class="room ${type} ${room.number}" id="${date}">
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

function getRoomsType(date, rooms) {
  let roomTypes = hotel.getRoomTypes(rooms);
  roomTypes.forEach(type => {
    setLocalStorage(hotel.filterRoomsByType(date, type), type);
    displayRoomType(date, type);
  });
  getAllRooms(date);
}

function getAllRooms(date) {
  setLocalStorage(hotel.getRoomsAvailable(date), 'all-types');
  displayRoomType(date, 'all-types');
}

function displayRoomType(date, type) {
  $('.rooms-type').attr('id', date);
  $('.rooms-type').append(`
    <button class="type" id="${type}">${type}</button>
  `);
}

function searchRoomType(date, key, rooms) {
  if (key === 'all-types') {
    getRoomsForDate(date);
  } else {
    if (rooms.length >= 1 && key !== 'all-types') {
      getRoomTypeInfo(rooms, key, date)
    } else {
      displayRoomsNotFound(date, key);
    }
  }
}

function getRoomTypeInfo(rooms, key, date) {
  emptyContainers();
  let type = rooms[0].roomType.toUpperCase();
  let message = `${type} Available ${date}`;
  displayInfoMessage(message, key);
  displayRooms(rooms, date);
}

function displayRoomsNotFound(date, key) {
  $('.rooms').empty();
  $('.info').empty();
  $('.info').append(`
  <div class="user-data">
  <p class="message" id="${key}">Selected Room Type Not Available ${date}</p>
  </div>
  `);
}

function getBookingData(roomId) {
  let day = $('.rooms-type').attr('id');
  let user = getLocalStorage('user');
  user ? bookRoom(user.id, day, roomId) : alert('Select User First');
}

function bookRoom(userId, day, roomId) {
  let bookingResponse = bookingHandler.book(userId, day, roomId);
  Promise.all([bookingResponse]).then(() => {
    // fetch GET data again
    location.reload()
    alert('Booking successful');
  });

}

function cancelBooking(bookingId) {
  let cancelResponse = bookingHandler.cancel(bookingId);
  console.log(cancelResponse)
  Promise.all([cancelResponse]).then(() => {
    // fetch GET data again
    location.reload();
    // getUserInfo(user);
    alert('Cancelation successful')
  });
}