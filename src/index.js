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

let data = {};

Promise.all([usersPromise, roomsPromise, bookingsPromise]).then(response => data = {
  users: response[0],
  rooms: response[1],
  bookings: response[2],
}).then(() => console.log(data));



$('.user-header').hide();
$('.admin-header').hide();
$('.main-user-login').hide();
$('.main-admin-login').hide();