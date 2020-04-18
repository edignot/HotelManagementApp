import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/hotel';
import bookingsTestData from '../test-data/bookings-test-data.js';
import roomsTestData from '../test-data/rooms-test-data.js';

describe('See if the tests are running', function () {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(roomsTestData, bookingsTestData);
  });
  it('should return true', function () {
    expect(true).to.equal(true);
  });
});