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

// $('.title-wrapper').click(() => {
//   window.location = './index.html';
// });

$('#user-login').click(() => {
  window.location = './user-login.html';
});

$('#admin-login').click(() => {
  window.location = './admin-login.html';
});

// UNCOMENT WHEN PAGE LOAD IS FIXED
// $('#logout').click(() => {
//   window.location = './index.html';
// });

// CHECK IF INPUT IS EMPTY, THEN DON'T REMOVE ATTRIBUTE
if ($('.date-input')) {
  $('.date-btn').removeAttr("disabled");
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

// .load() jquery
function displayUser() {
  // THIS ISN'T WORKING
  $('.user-info').hide();
}

// DUMMY FUNCTION, ADDED EVERYTHING THAT IS SUPPOSED TO RUN ON USER PAGE LOAD  // USERS PAGE //
$('.user-logout').click(() => {
  getUserData();
  flatpickr('.date-input');
});

function getUserData() {
  let user = getLocalStorage('user');
  let userBookings = bookingHandler.findBookings(user.id);
  displayUserInfo(user, userBookings);
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
  userBookings.forEach(booking => {
    hotel.rooms.forEach(room => {
      (room.number === booking.roomNumber) && displayBooking(booking, room);
    });
  });
}

function displayBooking(booking, room) {
  $('.user-bookings').prepend(`
  <section class="user-booking ${checkStatus(booking.date).toLowerCase()}">
  <div class="left">
    <p class="user-booking-status">${checkStatus(booking.date)}</p>
    <p class="user-date">${booking.date}</p>
    <p class="user-price">$${room.costPerNight}/night</p>
  </div>
  <div class="right">
    <p class="user-room">${room.roomType}</p>
    <p class="user-bed">${room.bedSize}</p>
    <p class="user-bed-num">beds: ${room.numBeds}</p>
  </div>
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

// DUMMY FUNCTION, ADDED EVERYTHING THAT IS SUPPOSED TO RUN ON USER PAGE LOAD  // ADMIN PAGE //
$('.admin-logout').click(() => {
  getAdminData();
});

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
  <p>Today's</br>Rooms available:</br><span>${available}</span></p> 
 `);
}

function displayRoomsBooked(today) {
  let booked = hotel.calcRoomsBooked(today);
  $('.admin-info').append(`
  <p>Today's</br>Rooms booked:</br><span>${booked}</span></p>
 `)
}

function displayRoomsOccupied(today) {
  let occupied = hotel.calcRoomsOccupied(today);
  $('.admin-info').append(`
  <p>Today's</br> Rooms Occupied:</br><span>${occupied}%</span></p>
 `)
}

$('.search-user-btn').click(() => {
  $('.user-bookings').empty();
  $('.info').empty();
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
  let userBookings = bookingHandler.findBookings(user.id);
  displayUserBookings(userBookings);
  displayUserInfo(user, userBookings)
}

function displayInfoMessage(message) {
  $('.info').append(`
  <div class="user-data">
  <p class="message">${message}</p>
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
  $('.info').empty();
  getUserInfo(user);
})

function displayUserInfo(user, userBookings) {
  let amount = hotel.getBookingsAmount(userBookings).toFixed(2);
  $('.info').append(`
  <div class="user-data">
  <p>Customer: ${user.name}</p>
  <p>Total Spending: $${amount}</p>
  </div>
 `)
}

$('.date-btn').click(() => {
  // let date = ('.date-input').val();
  // console.log(date);
  let rooms = hotel.getRoomsAvailable('2020/01/20');
  !rooms && displayInfoMessage('No Rooms Available on Selected Date');
  console.log('dom', rooms);

  let roomsType = hotel.filterRoomsByType('2020/01/20', 'single room');
  console.log('type', roomsType)
});