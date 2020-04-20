import chai from 'chai';
const expect = chai.expect;
import BookingHandler from '../src/BookingHandler';
import bookings from '../test-data/bookings-test-data.js';
import rooms from '../test-data/rooms-test-data.js';
import users from '../test-data/users-test-data.js';

describe('BOOKING DATA', function () {
  let bookingHandler;
  beforeEach(() => {
    bookingHandler = new BookingHandler();
  });
});