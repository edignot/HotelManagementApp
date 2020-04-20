class BookingHandler {
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
      .catch(error => {
        alert('Booking was NOT successful', error);
      });
  }

  cancel(bookingId) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: bookingId
        })
      })
      .catch(error => {
        console.log('Cancel was NOT successful', error);
      });
  }
}

export default BookingHandler;