package com.hotelbooking.repository;

import com.hotelbooking.models.BookingJournal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends CrudRepository<BookingJournal, Integer> {
  @Query(value = "SELECT * FROM booking_journal WHERE username = :username", nativeQuery = true)
  Optional<List<BookingJournal>> getBookingsForUser(@Param("username") String username);
}
