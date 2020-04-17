class Hotel {
  constructor(rooms, bookings) {
    // all rooms in hotel, from Room class
    this.rooms = rooms;
    // all bookings from booking class, inheritance? 
    this.bookings = bookings;
  }

  getBookingsAmount(bookings) {
    return this.rooms.reduce((sum, room) => {
      bookings.forEach(booking => {
        (booking.roomNumber === room.number) && (sum += room.costPerNight);
      })
      return sum;
    }, 0);
  }
}

export default Hotel;