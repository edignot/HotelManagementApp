import $ from 'jquery';
import './css/base.scss';
import './css/_media-queries.scss';
import Hotel from '../src/Hotel';
import BookingData from '../src/BookingData';
import {
  usersPromise,
  roomsPromise,
  bookingsPromise
} from "./utils.js";
import './images/hotel1.jpg'

let data = {};
let bookingData;
let hotel;

Promise.all([usersPromise, roomsPromise, bookingsPromise]).then(response => data = {
    users: response[0],
    rooms: response[1],
    bookings: response[2],
  })
  .then(() => {
    bookingData = new BookingData(data.bookings);
    hotel = new Hotel(data.rooms, bookingData);
  })
  .catch(error => {
    console.log(error);
  });

$('.title-wrapper').click(() => {
  window.location = './index.html';
});

$('#user-login').click(() => {
  window.location = './user-login.html';
});

$('#admin-login').click(() => {
  window.location = './admin-login.html';
});

$('#logout').click(() => {
  window.location = './index.html';
});

$('#user-login-btn').click(() => {
  let username = $('#user-login-input');
  let password = $('#user-password-input');
  let customer = username.val().split('').splice(0, 8).join('');
  let customerId = Number(username.val().split('').splice(8).join(''));
  let user = findUser(customerId);

  if (user && password.val() === 'overlook2020' && customer === 'customer') {
    setLocalStorage(user, 'user');
    window.location = './user.html';
    displayUser();
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

$('#admin-login-btn').click(() => {
  let username = $('#admin-login-input');
  let password = $('#admin-password-input');
  if (username.val() === 'manager' && password.val() === 'overlook2020') {
    window.location = './admin.html';
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

function displayLoginError(input) {
  input.css('border', '1px #fc0015 solid');
}

function resetLoginError(input) {
  input.css('border', '1px #132E88 solid');
}

function displayUser() {
  // THIS ISN'T WORKING
  $('.user-info').hide();
}

// DUMMY FUNCTION, ADDED EVERYTHING THAT IS SUPPOSED TO RUN ON USER PAGE LOAD
$('.user-amount').click(() => {
  getUserData();
});

function getUserData() {
  let user = getLocalStorage('user');
  let userBookings = bookingData.findBookings(user.id)
  displayUserData(user, userBookings);
  displayUserBookings(userBookings);
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function displayUserData(user, userBookings) {
  $('.name').text(`Welcome back, ${user.name}`);
  let amount = hotel.getBookingsAmount(userBookings).toFixed(2);
  $('.user-amount').text(`Total: $${amount}`);
}

function displayUserBookings(userBookings) {
  userBookings.forEach(booking => displayBooking(booking));
}

function displayBooking(booking) {
  $('.user-bookings').append(`
  <section class="user-booking">
  <div class="left">
    <p class="user-booking-status">Upcoming</p>
    <p class="user-date">04/20/2020</p>
    <p class="user-price">450$/night</p>
  </div>
  <div class="right">
    <p class="user-room">single room</p>
    <p class="user-bed">King Bed</p>
    <p class="user-bed-num">2</p>
  </div>
</section>

  `);
}