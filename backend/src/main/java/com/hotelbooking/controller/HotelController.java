package com.hotelbooking.controller;

import com.hotelbooking.models.Hotel;
import com.hotelbooking.service.HotelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://team-project-epic-bytes-202.s3-website-us-west-2.amazonaws.com"}, maxAge = 40000)
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @PostMapping("/hotels")
    public void addHotel(@RequestBody Hotel hotel) {
        hotel.setHotelName(hotel.getHotelName().toLowerCase());
        hotelService.addHotel(hotel);
    }

    @GetMapping("/hotels")
    public List<Hotel> searchHotel(@RequestParam(required = false) String location) throws Exception {
        if (location != null) {
            return hotelService.searchHotelByLocation(location.toLowerCase());
        }
        else {
            return hotelService.getAllHotels();
        }
    }

    @GetMapping("/hotels/{id}")
    public Optional<Hotel> getHotelById(@PathVariable Integer id)  {
        return hotelService.getHotelById(id);
        }

    @PutMapping("/hotels/{id}")
        public void updateHotelDetails(@RequestBody Hotel hotel, @PathVariable Integer id) {
        hotelService.updateHotelDetails(hotel, id);
    }

    @DeleteMapping("/hotels/{id}")
    public void deleteHotel(@PathVariable Integer id) {
        hotelService.deleteHotel(id);
    }
}
