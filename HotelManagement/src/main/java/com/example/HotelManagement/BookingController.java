package com.example.HotelManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import java.util.Date;
import java.util.List;

@RestController
// @RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public BookingController(BookingRepository bookingRepository, RoomRepository roomRepository,
            CustomerRepository customerRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.customerRepository = customerRepository;
    }

    // @PostMapping("/booking/create")
    // public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
    // // Generate a unique bookingId
    // booking.setBookingId(UUID.randomUUID().toString());

    // // Save the booking to the repository
    // Booking createdBooking = bookingRepository.save(booking);
    // // Reduce the room count based on the room type and dates
    // reduceRoomCount(booking.getRoomType(), booking.getCheckInDate(),
    // booking.getCheckOutDate(),
    // booking.getNoOfRooms());

    // return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    // }

    // @PostMapping("/booking/create")
    // public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
    // // Create a new Booking object
    // Booking newBooking = new Booking();

    // // Generate a unique bookingId
    // String bookingId = UUID.randomUUID().toString();
    // newBooking.setBookingId(bookingId);

    // // Set the values from the request body
    // newBooking.setNoOfPersons(booking.getNoOfPersons());
    // newBooking.setCheckInDate(booking.getCheckInDate());
    // newBooking.setCheckOutDate(booking.getCheckOutDate());
    // newBooking.setRoomId(booking.getRoomId());
    // newBooking.setRoomPrice(booking.getRoomPrice());
    // newBooking.setRoomType(booking.getRoomType());
    // newBooking.setServicePrice(booking.getServicePrice());
    // newBooking.setTotalAmount(booking.getTotalAmount());
    // newBooking.setEmail(booking.getEmail());

    // // Save the booking to the repository
    // Booking createdBooking = bookingRepository.save(newBooking);
    // // Reduce the room count based on the room type and dates
    // reduceRoomCount(newBooking.getRoomType(), newBooking.getCheckInDate(),
    // newBooking.getCheckOutDate(),
    // newBooking.getNoOfRooms());

    // return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    // }

    @PostMapping("/booking/create")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        // Create a new Booking object
        Booking newBooking = new Booking();

        // Generate a unique bookingId
        String bookingId = UUID.randomUUID().toString();
        newBooking.setBookingId(bookingId);

        // Set the values from the request body
        newBooking.setNoOfPersons(booking.getNoOfPersons());
        newBooking.setCheckInDate(booking.getCheckInDate());
        newBooking.setCheckOutDate(booking.getCheckOutDate());
        newBooking.setRoomId(booking.getRoomId());
        newBooking.setRoomPrice(booking.getRoomPrice());
        newBooking.setRoomType(booking.getRoomType());
        newBooking.setServicePrice(booking.getServicePrice());
        newBooking.setTotalAmount(booking.getTotalAmount());
        newBooking.setEmail(booking.getEmail());

        // Retrieve customer data based on email
        Customer customer = customerRepository.findByEmail(booking.getEmail());
        if (customer != null) {
            // Set fullName and phoneNumber from customer data
            newBooking.setFullName(customer.getFullName());
            newBooking.setPhoneNumber(customer.getPhoneNumber());
        }

        // Save the booking to the repository
        Booking createdBooking = bookingRepository.save(newBooking);

        // Save fullName and phoneNumber to booking collection
        createdBooking.setFullName(newBooking.getFullName());
        createdBooking.setPhoneNumber(newBooking.getPhoneNumber());
        bookingRepository.save(createdBooking);

        // Reduce the room count based on the room type and dates
        reduceRoomCount(newBooking.getRoomType(), newBooking.getCheckInDate(), newBooking.getCheckOutDate(),
                newBooking.getNoOfRooms());

        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    private void reduceRoomCount(String roomType, Date checkInDate, Date checkOutDate, int noOfRooms) {
        // Convert the Date objects to LocalDate
        LocalDate localCheckInDate = checkInDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate localCheckOutDate = checkOutDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        // Calculate the number of nights for the booking
        long numberOfNights = ChronoUnit.DAYS.between(localCheckInDate, localCheckOutDate);

        // Retrieve the rooms from the database based on the room type
        List<Room> rooms = roomRepository.findByRoomType(roomType);
        if (!rooms.isEmpty()) {
            // Choose the first room from the list (assuming there is only one room with the
            // specified room type)
            Room room = rooms.get(0);
            int updatedRoomCount = room.getRoomCount() - (noOfRooms * (int) numberOfNights);
            room.setRoomCount(updatedRoomCount);
            roomRepository.save(room);
        }
    }

    private void addRoomCount(String roomType, Date checkOutDate, int noOfRooms) {
        // Convert the Date object to LocalDate
        LocalDate localCheckOutDate = checkOutDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        // Retrieve the rooms from the database based on the room type
        List<Room> rooms = roomRepository.findByRoomType(roomType);
        if (!rooms.isEmpty()) {
            // Choose the first room from the list (assuming there is only one room with the
            // specified room type)
            Room room = rooms.get(0);
            // Add the number of rooms back to the room count after the checkout date
            int updatedRoomCount = room.getRoomCount() + noOfRooms;
            room.setRoomCount(updatedRoomCount);
            roomRepository.save(room);
        }
    }

    @GetMapping("/booking/all")
    public ResponseEntity<Iterable<Booking>> getAllBookings() {
        Iterable<Booking> bookings = bookingRepository.findAll();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // Get Booking Details - using customer email

    @GetMapping("/booking/{email}")
    public ResponseEntity<?> getBookingsByEmail(@PathVariable String email) {
        // Retrieve booking details based on the provided email
        List<Booking> bookings = bookingRepository.findByEmail(email);

        if (bookings.isEmpty()) {
            // If no bookings are found for the provided email, return a custom error
            // message
            String errorMessage = "No bookings found for the email: " + email;
            return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
        } else {
            // Return the list of bookings for the provided email
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        }
    }

}