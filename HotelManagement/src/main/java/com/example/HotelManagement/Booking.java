package com.example.HotelManagement;

import java.util.Date;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Booking {
    @Id
    private String bookingId;
    private String email;
    private String fullName;
    private String phoneNumber;
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date checkInDate;
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date checkOutDate;
    private int noOfPersons;
    private String roomType;
    private double servicePrice;
    private double totalAmount;
    private int noOfRooms;
    private double roomPrice;
    private String roomId;

    public Booking() {
        // Default constructor
    }

    public Booking(String bookingId, String email, String fullName, String phoneNumber, Date checkInDate,
            Date checkOutDate, int noOfPersons, String roomType, double servicePrice, double totalAmount,
            int noOfRooms, double roomPrice, String roomId) {
        this.bookingId = bookingId;
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.noOfPersons = noOfPersons;
        this.roomType = roomType;
        this.servicePrice = servicePrice;
        this.totalAmount = totalAmount;
        this.noOfRooms = noOfRooms;
        this.roomPrice = roomPrice;
        this.roomId = roomId;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }

    public Date getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(Date checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public int getNoOfPersons() {
        return noOfPersons;
    }

    public void setNoOfPersons(int noOfPersons) {
        this.noOfPersons = noOfPersons;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public double getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(double servicePrice) {
        this.servicePrice = servicePrice;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getNoOfRooms() {
        return noOfRooms;
    }

    public void setNoOfRooms(int noOfRooms) {
        this.noOfRooms = noOfRooms;
    }

    public double getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(double roomPrice) {
        this.roomPrice = roomPrice;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}
