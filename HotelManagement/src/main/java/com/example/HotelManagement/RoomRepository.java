package com.example.HotelManagement;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {

    List<Room> findByRoomType(String roomType);
    // You can add custom query methods here if needed
}
