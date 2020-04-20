import chai from 'chai';
const expect = chai.expect;
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
import BookingHandler from '../src/BookingHandler';
import bookings from '../test-data/bookings-test-data.js';
import rooms from '../test-data/rooms-test-data.js';
import users from '../test-data/users-test-data.js';

// const spies = require('chai-spies');
// chai.use(spies);

describe('BOOKING DATA', () => {
  let bookingHandler;
  beforeEach(() => {
    bookingHandler = new BookingHandler();
    beforeEach(() => mockServer.start(8080));
    afterEach(() => mockServer.stop());
  });

  it('should match responses with matching bodies', () => {
    bookingHandler.book(userId, day, roomId).thenReply(200, 'matching body')
      .then(() =>
        expect(fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')).to.have.responseText('matching body')
      );
  });

});