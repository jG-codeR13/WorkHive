package com.hotelbooking.models.request;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.*;
import java.util.Map;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {

  private String customerName;
  private Integer hotelId;
  @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
  private String email;
  private String phone;
  @Range(min=1, max=8)
  private int numberOfGuestsPerRoom;
  @Range(min=1, max=8)
  private int numberOfRooms;
  private Integer roomId;
  private long checkInDate;
  private long checkOutDate;
  public Map<String, Integer> amenitiesMap; // key: amenity name, value: count
  private boolean payment;

}
