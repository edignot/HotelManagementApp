class BookingHandler {
  constructor(bookings) {
    this.bookings = bookings;
  }

  findBookings(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

  book(userId, day, roomId) {
    let body = {
      'userID': userId,
      'date': day,
      'roomNumber': roomId,
    }
    fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        alert(error);
      });
  }

  cancelBooking() {

  }
}

export default BookingHandler;