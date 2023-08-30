package com.example.HotelManagement;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;

@EntityScan
public class Room {
    @Id
    private String roomNo;
    private String roomType;
    private int roomCount;
    private double roomPrice;

    public Room() {
    }

    public Room(String roomNo, String roomType, int roomCount, double roomPrice) {
        this.roomNo = roomNo;
        this.roomType = roomType;
        this.roomCount = roomCount;
        this.roomPrice = roomPrice;
    }

    public String getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(String roomNo) {
        this.roomNo = roomNo;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(int roomCount) {
        this.roomCount = roomCount;
    }

    public double getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(double roomPrice) {
        this.roomPrice = roomPrice;
    }
}
