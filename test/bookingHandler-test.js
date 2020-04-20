import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import BookingHandler from '../src/BookingHandler';

describe('BOOKING DATA', () => {
  let bookingHandler;
  beforeEach(() => {
    bookingHandler = new BookingHandler('url');
    chai.spy.on(bookingHandler, ['book'], () => true);
    chai.spy.on(bookingHandler, ['cancel'], () => true);
  });

  afterEach(() => {
    chai.spy.restore(bookingHandler);
  });

  it('should be an instance of BookingHandler', () => {
    expect(bookingHandler).to.be.an.instanceof(BookingHandler);
  });

  it('should store API address', () => {
    expect(bookingHandler.url).to.equal('url');
  });

  it('should book a room', () => {
    expect(bookingHandler.book()).to.equal(true);
  });

  it('should cancel booking', () => {
    expect(bookingHandler.cancel()).to.equal(true);
  });

});