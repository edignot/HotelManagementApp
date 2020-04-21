class Hotel {
  constructor(rooms, bookings) {
    this.rooms = rooms;
    this.bookings = bookings;
  }

  findBookings(id) {
    let sorted = this.bookings.sort((a, b) => {
      return a.date.match(/\d+/g).join('') - b.date.match(/\d+/g).join('');
    });
    return sorted.filter(booking => booking.userID === id);
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
    return available.filter(room => room.roomType === type);
  }

  getRoomTypes(date) {
    let available = this.getRoomsAvailable(date);
    return available.reduce((types, room) => {
      !types.includes(room.roomType) && types.push(room.roomType);
      return types;
    }, []);
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
    let bookings = this.getBookingsByDate(date);
    return (bookings.length * 100) / this.rooms.length;
  }
}

export default Hotel;