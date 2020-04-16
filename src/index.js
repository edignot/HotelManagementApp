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
  window.location = './admin.html';
});