class BookingData {
  constructor(bookings) {
    this.bookings = bookings;
  }

  findBookings(id) {
    return this.bookings.filter(booking => booking.userID === id)
  }
}

export default BookingData;