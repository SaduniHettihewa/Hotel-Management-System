package com.example.HotelManagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public RoomController(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping("/room/create")
    public ResponseEntity<String> createRoom(@RequestBody Room room) {
        // Check if the room already exists
        if (roomRepository.existsById(room.getRoomNo())) {
            return new ResponseEntity<>("Room already exists", HttpStatus.CONFLICT);
        }
        // Save the room to the repository
        roomRepository.save(room);
        return new ResponseEntity<>("Room created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/room/check-availability")
    public String checkRoomAvailability(@RequestParam("roomType") String roomType,
            @RequestParam("noOfRooms") int noOfRooms) {
        List<Room> rooms = roomRepository.findByRoomType(roomType);

        if (rooms.isEmpty()) {
            return "No rooms of type " + roomType + " available.";
        }

        for (Room room : rooms) {
            if (room.getRoomCount() >= noOfRooms) {
                return "Rooms are available!";
            }
        }

        return "Rooms are not available.";
    }

    @GetMapping("/room/all")
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        if (rooms.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @DeleteMapping("/room/delete/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable String roomId) {
        // Check if the room exists
        if (!roomRepository.existsById(roomId)) {
            return new ResponseEntity<>("Room not found", HttpStatus.NOT_FOUND);
        }
        // Delete the room from the repository
        roomRepository.deleteById(roomId);

        return new ResponseEntity<>("Room deleted successfully", HttpStatus.OK);
    }

}
