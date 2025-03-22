package com.hotelbooking.validators;

import com.hotelbooking.exception.HotelException;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class DateValidator {

  public void validateDate(LocalDate checkInDate, LocalDate checkOutDate) {
    long totalNights = ChronoUnit.DAYS.between(checkInDate, checkOutDate);

    if (checkInDate == null) {
      throw new HotelException("Missing check in date");
    } else if (checkOutDate == null) {
      throw new HotelException("Missing check out date");
    } else if (checkInDate.isBefore(LocalDate.now())) {
      throw new HotelException("Check in date must be in the future");
    } else if (checkOutDate.isBefore(checkInDate)) {
      throw new HotelException("Check out date must occur after check in date");
    } else if (totalNights < 1) {
      throw new HotelException("Reservation must be for at least 1 night");
    } else if (totalNights > 7)
      throw new HotelException("Reservation can be for at most 7 nights");
  }
}
