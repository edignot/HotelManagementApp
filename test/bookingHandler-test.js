import chai from 'chai';
const expect = chai.expect;
import BookingHandler from '../src/BookingHandler';
import bookings from '../test-data/bookings-test-data.js';
import rooms from '../test-data/rooms-test-data.js';
import users from '../test-data/users-test-data.js';

describe('BOOKING DATA', function () {
  let bookingHandler;
  beforeEach(() => {
    bookingHandler = new BookingHandler(bookings);
  });

  it('should find all user bookings', function () {
    expect(bookingHandler.findBookings(2)).to.deep.equal([bookings[0], bookings[2]]);
  });
});