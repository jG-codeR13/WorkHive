package com.hotelbooking.models;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Amenity {

  /**
   * Options may be selected for each room for one or more amenities:
   * Daily Continental Breakfast
   * Access to fitness room
   * Access to Swimming Pool/Jacuzzi
   * Daily Parking
   * All meals included (Breakfast, Lunch, Dinner)
   */

  @Id
  @Column(length = 15)
  private String name;

  @Column
  @NotBlank(message = "Description is mandatory")
  private String description;

  @Column
  @NotNull
  private double price;
}
