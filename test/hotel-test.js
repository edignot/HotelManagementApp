import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/hotel';
import bookingsTestData from '../test-data/bookings-test-data.js';
import roomsTestData from '../test-data/rooms-test-data.js';

describe('HOTEL', function () {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(roomsTestData, bookingsTestData);
  });

  it('should return true', function () {
    expect(true).to.equal(true);
  });

  it('should store hotel room data', function () {
    expect(hotel.rooms.length).to.equal(4);
  });

  it('should store hotel bookings', function () {
    expect(hotel.bookings.length).to.equal(4);
  });

  it('should calculate total bookings amount', function () {
    expect(hotel.getBookingsAmount(bookingsTestData)).to.equal(429.44);
  });

  it('should return rooms available', function () {
    expect(hotel.getRoomsAvailable('2020/02/16')).to.deep.equal([roomsTestData[0], roomsTestData[1], roomsTestData[2]]);
  });

  it('should filter rooms by type', function () {
    expect(hotel.filterRoomsByType('2020/05/16', 'single room')).to.deep.equal([roomsTestData[2], roomsTestData[3]]);
  });

  it('should calculate revenue by date', function () {
    expect(hotel.calcRevenue('2020/02/16')).to.equal('429.44');
  });

  it('should calculate rooms available by date', function () {
    expect(hotel.calcRoomsAvailable('2020/02/16')).to.equal(3);
  });

  it('should calculate rooms booked by date', function () {
    expect(hotel.calcRoomsBooked('2020/02/16')).to.equal(1);
  });

  it('should calculate rooms occupied % by date', function () {
    expect(hotel.calcRoomsOccupied('2020/02/20')).to.equal(0);
  });
});