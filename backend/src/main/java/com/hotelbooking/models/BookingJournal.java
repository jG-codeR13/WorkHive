package com.hotelbooking.models;

import com.hotelbooking.models.response.AmenityResponse;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookingJournal {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;
  @Column(unique = true)
  private UUID bookingId;
  @Column private String username;

  public BookingJournal(UUID bookingId, String username, String customerName, String hotelAddress, Integer hotelId, String roomType, int numberOfRooms, long totalNights, int numberOfGuestsPerRoom, LocalDate checkInDate, LocalDate checkOutDate, double perRoomPerNightPrice, double totalRoomPrice, String amenitiesResponse, double totalAmenityPrice, double taxableAmount, double tax, String surchargeType, double surcharge, String loyaltyType, double loyaltyDiscount, double price, int rewardPoints, String email, String phone, LocalDateTime localDateTime, Integer roomId, String hotelName, String hotelImage) {
    this.bookingId = bookingId;
    this.username = username;
    this.customerName = customerName;
    this.hotelAddress = hotelAddress;
    this.hotelId = hotelId;
    this.roomType = roomType;
    this.numberOfRooms = numberOfRooms;
    this.totalNights = totalNights;
    this.numberOfGuestsPerRoom = numberOfGuestsPerRoom;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.perRoomPerNightPrice = perRoomPerNightPrice;
    this.totalRoomPrice = totalRoomPrice;
    this.amenitiesResponse = amenitiesResponse;
    this.totalAmenityPrice = totalAmenityPrice;
    this.taxableAmount = taxableAmount;
    this.tax = tax;
    this.surchargeType = surchargeType;
    this.surcharge = surcharge;
    this.loyaltyType = loyaltyType;
    this.loyaltyDiscount = loyaltyDiscount;
    this.price = price;
    this.rewardPoints = rewardPoints;
    this.email = email;
    this.phone = phone;
    this.localDateTime = localDateTime;
    this.roomId = roomId;
    this.hotelName = hotelName;
    this.hotelImage = hotelImage;
  }
  @Column private String customerName;
  @Column private String hotelAddress;
  @Column private Integer hotelId;
  @Column private String roomType;
  @Column private int numberOfRooms;
  @Column private int numberOfGuestsPerRoom;
  @Column private LocalDate checkInDate;
  @Column private LocalDate checkOutDate;
  @Column private long totalNights;
  @Column private double perRoomPerNightPrice;
  @Column private double totalRoomPrice;
  @Column private String amenitiesResponse;
  @Column private double totalAmenityPrice;
  @Column private double taxableAmount;
  @Column private double tax;
  @Column private String surchargeType;
  @Column private double surcharge;
  @Column private String loyaltyType;
  @Column private double loyaltyDiscount;
  @Column private double price;
  @Column private int rewardPoints;
  @Column private String email;
  @Column private String phone;
  @Column private LocalDateTime localDateTime;
  @Column private Integer roomId;
  @Column private String hotelName;
  @Column private String hotelImage;


}
