import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel';
import bookings from '../test-data/bookings-test-data.js';
import rooms from '../test-data/rooms-test-data.js';

describe('HOTEL', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(rooms, bookings);
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should store hotel room data', () => {
    expect(hotel.rooms.length).to.equal(4);
  });

  it('should store hotel bookings', () => {
    expect(hotel.bookings.length).to.equal(4);
  });

  it('should find all user bookings', () => {
    expect(hotel.findBookings(2)).to.deep.equal([bookings[0], bookings[2]]);
  });

  it('should find all bookings by date', () => {
    expect(hotel.getBookingsByDate('2020/02/16')).to.deep.equal([bookings[3]]);
  });

  it('should calculate total bookings amount', () => {
    expect(hotel.getBookingsAmount(bookings)).to.equal(429.44);
  });

  it('should return rooms available', () => {
    expect(hotel.getRoomsAvailable('2020/02/16')).to.deep.equal(
      [rooms[0], rooms[1], rooms[2]]);
  });

  it('should filter rooms by type', () => {
    expect(hotel.filterRoomsByType('2020/05/16', 'single room', 'roomType')).to.deep.equal(
      [rooms[2], rooms[3]]);
  });

  it('should get all room types available for a date', () => {
    expect(hotel.getTypes('2020/05/16', 'roomType')).to.deep.equal(
      ['residential suite', 'suite', 'single room']);
  });

  it('should calculate revenue by date', () => {
    expect(hotel.calcRevenue('2020/02/16')).to.equal('429.44');
  });

  it('should calculate rooms available by date', () => {
    expect(hotel.calcRoomsAvailable('2020/02/16')).to.equal(3);
  });

  it('should calculate rooms occupied % by date', () => {
    expect(hotel.calcRoomsBooked('2020/02/20')).to.equal(0);
  });
});