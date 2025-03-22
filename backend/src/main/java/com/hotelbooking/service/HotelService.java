package com.hotelbooking.service;

import com.hotelbooking.models.Hotel;
import com.hotelbooking.repository.HotelRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

  private final HotelRepository hotelRepository;

  public HotelService(HotelRepository hotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  public List<Hotel> searchHotelByLocation(String location) throws Exception {
    Optional<List<Hotel>> hotelList = hotelRepository.getHotels(location);
    hotelList.orElseThrow(
        () ->
            new EntityNotFoundException(
                "No hotels found for " + location + ". Let's try something else."));
    return hotelList.get();
  }

  public List<Hotel> getAllHotels() {
    return (List<Hotel>) hotelRepository.findAll();
  }

  public Optional<Hotel> getHotelById(Integer id) {
    return hotelRepository.findById(id);
  }

  public void updateHotelDetails(Hotel hotel, Integer id) {
    Hotel currentHotel = hotelRepository.findById(id).orElseThrow(RuntimeException::new);
    currentHotel.setHotelName(hotel.getHotelName());
    currentHotel.setLocation(hotel.getLocation());
    currentHotel.setHotelAddress(hotel.getHotelAddress());
    currentHotel.setHotelEmail(hotel.getHotelEmail());
    currentHotel.setHotelPhone(hotel.getHotelPhone());
    currentHotel.setHotelBasePrice(hotel.getHotelBasePrice());
    hotelRepository.save(currentHotel);
  }

  public void deleteHotel(Integer id) {
    hotelRepository.deleteById(id);
  }

  public void addHotel(Hotel hotel) {
    hotelRepository.save(hotel);
  }
}
