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

Promise.all([usersPromise, roomsPromise, bookingsPromise]).then(response => data = {
  users: response[0],
  rooms: response[1],
  bookings: response[2],
}).then(() => startApp());

function startApp() {
  displayLogin();
}

function displayLogin() {
  // do domething on a page load
}

$('.title-wrapper').click(() => {
  window.location = './index.html';
});

$('#user-login').click(() => {
  window.location = './user-login.html';
});

$('#admin-login').click(() => {
  window.location = './admin-login.html';
});

$('#user-login-btn').click(() => {
  window.location = './user.html';
});

$('#admin-login-btn').click(() => {
  let loginInput = $('#admin-login-input');
  let passwordInput = $('#admin-password-input');
  if (loginInput.val() === 'manager' && passwordInput.val() === 'overlook2020') {
    window.location = './admin.html';
  }

  if (loginInput.val() !== 'manager' && passwordInput.val() === 'overlook2020') {
    loginInput.val('');
    displayLoginError(loginInput);
    resetLoginError(passwordInput);
  }

  if (loginInput.val() === 'manager' && passwordInput.val() !== 'overlook2020') {
    passwordInput.val('');
    displayLoginError(passwordInput);
    resetLoginError(loginInput);
  }

  if (loginInput.val() !== 'manager' && passwordInput.val() !== 'overlook2020') {
    loginInput.val('');
    passwordInput.val('');
    displayLoginError(loginInput);
    displayLoginError(passwordInput);
  }
});

function displayLoginError(input) {
  input.css('border', '1px #fc0015 solid');
}

function resetLoginError(input) {
  input.css('border', '1px #132E88 solid');
}