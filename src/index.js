import $ from 'jquery';
import './css/base.scss';
import "./css/_media-queries.scss";
import Hotel from '../src/Hotel';
import BookingData from '../src/BookingData';
import {
  usersPromise,
  roomsPromise,
  bookingsPromise
} from "./utils.js";
import './images/hotel1.jpg'

const header = $('.header');
const userHeader = $('.user-header');
const adminHeader = $('.admin-header');
const login = $('.login');
const userLogin = $('.user-login');
const adminLogin = $('.admin-login');


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
  header.show();
  login.show();
  userHeader.hide();
  userLogin.hide();
  adminHeader.hide();
  adminLogin.hide();
}

$('#user-login').click(function () {
  displayUserLogin();
})

$('#admin-login').click(function () {
  displayAdminLogin();
})

function displayUserLogin() {
  header.hide();
  login.hide();
  userHeader.show();
  userLogin.show();
  adminHeader.hide();
  adminLogin.hide();
}

function displayAdminLogin() {
  header.hide();
  login.hide();
  userHeader.hide();
  userLogin.hide();
  adminHeader.show();
  adminLogin.show();
}