class BookingHandler {
  constructor(bookings) {
    this.bookings = bookings;
  }

  findBookings(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

  book(id, userId, date, roomId) {
    let body = {
      id,
      "userID": userId,
      date,
      "roomNumber": roomId,
      "roomServiceCharges": []
    }
    fetch(`https://fe-apps.herokuapp.com/api/v1/fitlit/1908/${url}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .catch(err => {
        alert(error);
      });
  }

  cancelBooking() {

  }
}

export default BookingHandler;