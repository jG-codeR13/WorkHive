package com.hotelbooking.repository;

import com.hotelbooking.models.Hotel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface HotelRepository extends CrudRepository<Hotel, Integer> {
    @Query(value = "SELECT * FROM hotel WHERE location =:location", nativeQuery = true)
    Optional<List<Hotel>> getHotels(@Param("location") String location);
}

