class Hotel {
  constructor(rooms, bookings) {
    this.rooms = rooms;
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

  getRoomsAvailable(date) {
    let booked = this.bookings.reduce((rooms, booking) => {
      (booking.date === date) && rooms.push(booking.roomNumber)
      return rooms;
    }, [])
    return this.rooms.filter(room => !booked.includes(room.number));
  }

  filterRoomsByType(date, type) {
    let available = this.getRoomsAvailable(date);
    return available.filter(room => room.roomType === type);
  }

  calcRevenue(date) {
    let dateBookings = this.bookings.filter(booking => booking.date === date);
    let revenue = dateBookings.reduce((sum, booking) => {
      this.rooms.forEach(room => {
        (room.number === booking.roomNumber) && (sum += room.costPerNight);
      })
      return sum;
    }, 0)
    return revenue.toFixed(2);
  }

  calcRoomsAvailable(date) {
    let dateBookings = this.bookings.filter(booking => booking.date === date);
    return this.rooms.length - dateBookings.length;
  }

  calcRoomsBooked(date) {
    return this.bookings.filter(booking => booking.date === date).length;
  }

  calcRoomsOccupied(date) {
    let dateBookings = this.bookings.filter(booking => booking.date === date);
    return (dateBookings.length * 100) / this.rooms.length;
  }
}

export default Hotel;