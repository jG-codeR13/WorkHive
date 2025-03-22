package com.hotelbooking.service.util;

import com.hotelbooking.models.*;
import com.hotelbooking.models.request.BookingRequest;
import com.hotelbooking.models.response.AmenityResponse;
import com.hotelbooking.models.response.BookingResponse;
import com.hotelbooking.pricing.*;
import com.hotelbooking.service.AmenityService;
import com.hotelbooking.service.HotelService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Component
@NoArgsConstructor
public class ResponseBuilder {

  public ChristmasHolidayPricing christmasHolidayPricing;
  public CustomerLoyaltyPricing customerLoyaltyPricing;
  public PublicHolidayPricing publicHolidayPricing;
  public SeasonalPeakPricing seasonalPeakPricing;
  public WeekendPricing weekendPricing;
  public AmenityService amenityService;
  public HotelService hotelService;

  @Autowired
  public ResponseBuilder(
      ChristmasHolidayPricing christmasHolidayPricing,
      CustomerLoyaltyPricing customerLoyaltyPricing,
      PublicHolidayPricing publicHolidayPricing,
      SeasonalPeakPricing seasonalPeakPricing,
      WeekendPricing weekendPricing,
      AmenityService amenityService,
      HotelService hotelService) {
    super();
    this.christmasHolidayPricing = christmasHolidayPricing;
    this.customerLoyaltyPricing = customerLoyaltyPricing;
    this.publicHolidayPricing = publicHolidayPricing;
    this.seasonalPeakPricing = seasonalPeakPricing;
    this.weekendPricing = weekendPricing;
    this.amenityService = amenityService;
    this.hotelService = hotelService;
  }

  public BookingResponse getBookingResponse(
      BookingRequest bookingRequest,
      Room room,
      User user,
      LocalDate checkInDate,
      LocalDate checkOutDate) {
    BookingResponse bookingResponse = new BookingResponse();
    DayOfWeek checkInDay = DayOfWeek.of(checkInDate.get(ChronoField.DAY_OF_WEEK));
    DayOfWeek checkOutDay = DayOfWeek.of(checkOutDate.get(ChronoField.DAY_OF_WEEK));
    long totalNights = ChronoUnit.DAYS.between(checkInDate, checkOutDate);
    double perNightPrice = room.getPerNightPrice();

    // numberOfRooms
    bookingResponse.setNumberOfRooms(bookingRequest.getNumberOfRooms());

    // totalNights
    bookingResponse.setTotalNights(totalNights);

    // perNightPrice
    bookingResponse.setPerRoomPerNightPrice(perNightPrice);

    // amenityPrice

    List<AmenityResponse> amenitiesResponse = new ArrayList<>();
    double amenitiesTotalPrice = 0;
    double amenityPrice = 0;

    Map<String, Integer> amenitiesRequest = bookingRequest.getAmenitiesMap();
    for (Map.Entry<String, Integer> entry : amenitiesRequest.entrySet()) {
      String key = entry.getKey();
      Integer value = entry.getValue();
      if (value > 0) {
        Optional<Amenity> amenity = amenityService.getAmenityById(key);
        amenity.orElseThrow(() -> new RuntimeException("Amenity not found"));
        amenityPrice = amenity.get().getPrice();
        AmenityResponse am = new AmenityResponse();
        am.setDescription(amenity.get().getDescription());
        am.setCount(value);
        am.setPrice(amenityPrice);
        amenitiesResponse.add(am);
        amenitiesTotalPrice += amenityPrice * value;
      }
    }

    bookingResponse.setTotalAmenityPrice(amenitiesTotalPrice);
    bookingResponse.setAmenitiesResponse(amenitiesResponse);

    // totalRoomPrice
    double totalRoomPrice = perNightPrice * bookingRequest.getNumberOfRooms();
    bookingResponse.setTotalRoomPrice(totalRoomPrice);

    //taxableAmount
    double taxableAmount = totalNights * (totalRoomPrice + amenitiesTotalPrice);
    bookingResponse.setTaxableAmount(taxableAmount);

    // tax 10%
    double tax = taxableAmount * 0.1;
    bookingResponse.setTax(tax);

    // surchargeType and surcharge
    if ((checkInDate.isAfter(christmasHolidayPricing.getChristmasStartDate()))
        && (checkOutDate.isBefore(christmasHolidayPricing.getChristmasEndDate()))) {
      System.out.println("christmas");
      bookingResponse.setSurcharge(christmasHolidayPricing.getPriceMultiplier() * taxableAmount);
      bookingResponse.setSurchargeType("Christmas Holiday Surcharge - 20%");
    } else if (publicHolidayPricing.getDates().contains(checkInDate)
        || publicHolidayPricing.getDates().contains(checkOutDate)) {
      System.out.println("public holiday");
      bookingResponse.setSurcharge(publicHolidayPricing.getPriceMultiplier() * taxableAmount);
      bookingResponse.setSurchargeType("Public Holiday Surcharge - 15%");
    } else if (weekendPricing.getDays().contains(checkInDay)
        || weekendPricing.getDays().contains(checkOutDay)) {
      System.out.println("weekend");
      bookingResponse.setSurcharge(weekendPricing.getPriceMultiplier() * taxableAmount);
      bookingResponse.setSurchargeType("Weekend Surcharge - 10%");
    } else if ((checkInDate.isAfter(seasonalPeakPricing.getSeasonStartDate()))
            && (checkOutDate.isBefore(seasonalPeakPricing.getSeasonEndDate()))) {
      System.out.println("seasonal");
      bookingResponse.setSurcharge(christmasHolidayPricing.getPriceMultiplier() * taxableAmount);
      bookingResponse.setSurchargeType("Seasonal Holiday Surcharge - 5%");

    }else {
      bookingResponse.setSurcharge(0);
      bookingResponse.setSurchargeType("Surcharge");
    }

    // loyaltyDiscount
    double multiplier = customerLoyaltyPricing.getPriceMultiplier(user.getTier());
    double loyaltyDiscount = multiplier * taxableAmount;
    bookingResponse.setLoyaltyDiscount(loyaltyDiscount);

    bookingResponse.setLoyaltyType(String.valueOf(user.getTier())  +" - "+ String.valueOf(
  multiplier * 100) + "%");
    System.out.println("inside loyaltyDiscount tax==========" + loyaltyDiscount);

    // totalPrice
    double totalPrice = (taxableAmount + tax + bookingResponse.getSurcharge()) - (loyaltyDiscount);
    bookingResponse.setTotalPrice(totalPrice);
    bookingResponse.setCheckInDate(checkInDate);
    bookingResponse.setCheckOutDate(checkOutDate);
    bookingResponse.setCustomerName(bookingRequest.getCustomerName());
    bookingResponse.setEmail(bookingRequest.getEmail());
    bookingResponse.setRoomType(room.getRoomType());
    bookingResponse.setPhone(bookingRequest.getPhone());
    Hotel hotel = hotelService.getHotelById(bookingRequest.getHotelId()).get();
    bookingResponse.setHotelName(hotel.getHotelName());
    bookingResponse.setHotelImage(hotel.getImageURL());
    bookingResponse.setHotelAddress(hotel.getHotelAddress());

    return bookingResponse;
  }

}
