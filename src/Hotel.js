class Hotel {
  constructor(rooms, bookings) {
    this.rooms = rooms;
    this.bookings = bookings;
  }

  getBookingsByDate(date) {
    return this.bookings.filter(booking => booking.date === date);
  }

  getBookingsAmount(bookings) {
    return this.rooms.reduce((sum, room) => {
      bookings.forEach(booking => {
        (booking.roomNumber === room.number) && (sum += room.costPerNight);
      })
      return sum;
    }, 0);
  }

  getRoomsAvailable(date) {
    let booked = this.bookings.reduce((rooms, booking) => {
      (booking.date === date) && rooms.push(booking.roomNumber)
      return rooms;
    }, [])
    return this.rooms.filter(room => !booked.includes(room.number));
  }

  filterRoomsByType(date, type) {
    let available = this.getRoomsAvailable(date);
    console.log('available', available)
    return available.filter(room => room.roomType === type);
  }

  calcRevenue(date) {
    let bookings = this.getBookingsByDate(date);
    let revenue = bookings.reduce((sum, booking) => {
      this.rooms.forEach(room => {
        (room.number === booking.roomNumber) && (sum += room.costPerNight);
      })
      return sum;
    }, 0)
    return revenue.toFixed(2);
  }

  calcRoomsAvailable(date) {
    let bookings = this.getBookingsByDate(date);
    return this.rooms.length - bookings.length;
  }

  calcRoomsBooked(date) {
    return this.bookings.filter(booking => booking.date === date).length;
  }

  calcRoomsOccupied(date) {
    let bookings = this.getBookingsByDate(date);
    return (bookings.length * 100) / this.rooms.length;
  }
}

export default Hotel;