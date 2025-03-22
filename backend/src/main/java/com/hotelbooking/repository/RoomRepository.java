package com.hotelbooking.repository;

import com.hotelbooking.models.Hotel;
import com.hotelbooking.models.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends CrudRepository<Room, Integer> {
    @Query(value = "SELECT * FROM room WHERE beds >=:noOfGuests", nativeQuery = true)
    Optional<List<Room>> getRooms(@Param("noOfGuests") int noOfGuests);
}
