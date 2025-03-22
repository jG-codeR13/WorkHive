package com.hotelbooking.controller;

import com.hotelbooking.models.Hotel;
import com.hotelbooking.models.Room;
import com.hotelbooking.service.HotelService;
import com.hotelbooking.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://team-project-epic-bytes-202.s3-website-us-west-2.amazonaws.com"}, maxAge = 40000)
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/rooms")
    public void addRoom(@RequestBody Room room) {

        roomService.addRoom(room);
    }

    @GetMapping("/rooms")
    public List<Room> getAllRooms(@RequestParam(required = false) Integer noOfGuests) throws Exception {
        if (noOfGuests != null) {
            return roomService.getRoomByBeds(noOfGuests);
        }

        else {
            return roomService.getAllRooms();
        }
    }


    @GetMapping("/rooms/{id}")
    public Optional<Room> getRoomById(@PathVariable Integer id)  {
        return roomService.getRoomById(id);
    }

    @PutMapping("/rooms/{id}")
    public void updateRoomDetails(@RequestBody Room room, @PathVariable Integer id) {
        roomService.updateRoomDetails(room, id);
    }

    @DeleteMapping("/rooms/{id}")
    public void deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
    }
}
