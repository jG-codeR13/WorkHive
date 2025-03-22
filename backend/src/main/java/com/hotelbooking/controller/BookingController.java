package com.hotelbooking.controller;

import com.hotelbooking.models.BookingJournal;
import com.hotelbooking.models.request.BookingRequest;
import com.hotelbooking.models.response.BookingResponse;
import com.hotelbooking.service.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://team-project-epic-bytes-202.s3-website-us-west-2.amazonaws.com"}, maxAge = 40000)
public class BookingController {

  private BookingService bookingService;

  public BookingController(BookingService bookingService) {
    this.bookingService = bookingService;
  }

  @PostMapping("/bookings")   // admin and customer
  public BookingResponse createBooking(@Valid @RequestBody BookingRequest bookingRequest) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return bookingService.createBooking(bookingRequest, username);
  }

  @GetMapping("/bookings") // admin
  public List<BookingJournal> getAllBookings() {
    return bookingService.getAllBookings();
  }

  @GetMapping("/bookings/{bookingID}") // admin
  public Optional<BookingJournal> getBookingById(@PathVariable Integer bookingID) {
    return bookingService.getBookingById(bookingID);
  }

  @GetMapping("/bookings/users") // admin and customer
  public Optional<List<BookingJournal>> getBookingsForUser() throws Exception {
    log.info("Entering getBookingsForUser Api");
    try {
      String username = SecurityContextHolder.getContext().getAuthentication().getName();
      System.out.println("===============username is==========" + username);
      return bookingService.getBookingsForUser(username);
    } catch (Exception e) {
      log.error("Error occured in getBookingsForUser :{}", e);
    }

    return null;
  }

  @PutMapping("/bookings/{bookingID}")  // admin and customer
  public void updateBookingDetails(
      @RequestBody BookingRequest bookingRequest, @PathVariable Integer bookingID) {
    bookingService.updateBookingDetails(bookingRequest, bookingID);
  }

  @DeleteMapping("/bookings/{bookingID}") // admin and customer
  public void cancelBooking(@PathVariable Integer bookingID) {
    bookingService.cancelBooking(bookingID);
  }
}
