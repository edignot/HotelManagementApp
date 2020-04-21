class BookingHandler {
  constructor(url) {
    this.url = url;
  }
  book(userId, day, roomId) {
    let body = {
      'userID': userId,
      'date': day,
      'roomNumber': roomId,
    }
    fetch(this.url, {
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
    return fetch(this.url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: bookingId
        })
      })
      .then(response => response.json())
      .catch(error => {
        console.log('Cancel was NOT successful', error);
      });
  }
}

export default BookingHandler;