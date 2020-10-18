# OVERLOOK - Hotel Management App 

## https://edignot.github.io/HotelManagementApp/
Log in as a User: username: customer[1 - 50] (e.g. customer17) , password: overlook2020
Log in as a Manager: username: manager, password: overlook2020

### About
This is responsive Hotel management app for customers and staff. Users are able to sign-in, view, book and delete upcoming bookings using fetch API. The purpose of this project is to get deeper understanding of Object Oriented Programming, Test Driven Development, practice fetch get/ post and delete requests, get experience using jQuery, SASS, Webpack.
This was a solo project during Module 2 at [Turing School of Software & Design](https://turing.io/).

* [Abstract](#Abstract)
* [User Story](#User-Story)
* [Manager Story](#Manager-Story)
* [Technologies Used](#Technologies-Used)
* [Install](#Install)

![mockup](/readme-img/overlookmockup1.jpg)

---
### User Interaction
![](readme-img/user-interaction.gif)
---
### User Story 
#### 1. Choose to Login as a User
![1](/readme-img/user1.png)
---
#### 2. Enter username and password and Login
![2](/readme-img/user2.png)
---
#### 3. See Welcome / Enter page
![3](/readme-img/user3.png)
---
#### 4. See personalized Welcome message, total ammount spent, booking history
![4](/readme-img/user4.png)
---
#### 5. Select a date and see all rooms available for that date. Filter available rooms by price(min/max), bed size, number of beds, room type
![5](/readme-img/user5.png)
---
#### 6. Book a room and instantly see updated booking history, total amount spent ( Customer cannot cancel a booking )
![6](/readme-img/user6.png)
---
#### 7. Logout
![7](/readme-img/user7.png)
---
### Manager Interaction:
![](readme-img/admin-interaction.gif)
---
### Manager Story:
#### 1. Choose to Login as a Manager / Admin
![1](/readme-img/admin1.png)
---
#### 2. Enter username and password and Login
![2](/readme-img/admin2.png)
---
#### 3. See Welcome / Enter page
![3](/readme-img/admin3.png)
---
#### 4. See today's revenue, number rooms booked and rooms available
![4](/readme-img/admin4.png)
---
#### 5. Search for a user by name or lastname. Be able to choose user if there are more than one search result
![5](/readme-img/admin5.png)
---
#### 6. See user's name, booking history, total amount spent
![6](/readme-img/admin6.png)
---
#### 7. Cancel upcoming booking for a user ( today's booking cannot be canceled )
![7](/readme-img/admin7.png)
---
#### 8. See confirmation message if booking was canceled successfully
![8](/readme-img/admin8.png)
---
#### 9. Select a date and see all rooms available for that date. Filter available rooms by price(min/max), bed size, number of beds, room type
![9](/readme-img/admin9.png)
---
#### 10. Book a room for user and instantly see updated user's booking history, total amount spent. If booking is upcoming - can instantly cancel it if booked by mistake
![10](/readme-img/admin10.png)
---
#### 11. See confirmation message if booking is successful
![11](/readme-img/admin11.png)
---
#### 12. Logout
![12](/readme-img/admin12.png)
---

### Technologies Used
- JavaScript
- jQuery
- Sass
- Fetch
- ARIA
- Webpack
- Mocha | Chai | Chai Spies

### Main Files
#### [index.js](https://github.com/edignot/HotelManagementApp/blob/master/src/index.js)
#### Classes
- [Hotel Class](https://github.com/edignot/HotelManagementApp/blob/master/src/Hotel.js)
  - [Hotel Testing](https://github.com/edignot/HotelManagementApp/blob/master/test/hotel-test.js)
- [Bookings Handler Class](https://github.com/edignot/HotelManagementApp/blob/master/src/BookingHandler.js)
  - [Bookings Testing](https://github.com/edignot/HotelManagementApp/blob/master/test/bookingHandler-test.js)

### Install
1. Clone this repo
1. Run `npm install` to get dependencies
1. Run `npm start` to start the webserver 
1. Open `localhost:8080` in your favorite browser
1. Log in as a User:  username: customer[1 - 50] (e.g. customer17) , password: overlook2020
1. Log in as a Manager:  username: manager, password: overlook2020

### Contributors
#### [Edita Ignot](https://github.com/edignot) | [MY COMMITS](https://github.com/edignot/HotelManagementApp/commits/master?after=d6631bea6f06ea223dda6774e3ceccfeef15cf22+34&author=edignot&branch=master)
