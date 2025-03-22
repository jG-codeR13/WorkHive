package com.hotelbooking.models.response;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;


@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class BookingResponse {
    private int numberOfRooms;
    private long totalNights;
    private double perRoomPerNightPrice;
    private double totalRoomPrice;
    private List<AmenityResponse> amenitiesResponse;// amenity description and count and price
    private double totalAmenityPrice;
    private double taxableAmount;
    private double tax;
    private String surchargeType;
    private double surcharge;
    private double loyaltyDiscount;
    private String loyaltyType;
    private double totalPrice;
    private String customerName;
    private String email;
    private String phone;
    private int numberOfGuestsPerRoom;
    private String hotelName;
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String hotelImage;
    private String hotelAddress;

    }

