class BookingHandler {
  constructor(bookings) {
    this.bookings = bookings;
  }

  findBookings(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

  book(bookingId, userId, day, roomId) {
    let body = {
      'id': bookingId,
      'userID': userId,
      'date': day,
      'roomNumber': roomId,
      roomServiceCharges: []
    }
    fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .catch(error => {
        alert(error);
      });
  }

  cancelBooking() {

  }
}

export default BookingHandler;