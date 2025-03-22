package com.hotelbooking.models;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Hotel {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Column
  @NotBlank(message = "Hotel Name is mandatory")
  private String hotelName;

  @Column
  private String description;

  @Column
  @NotBlank(message = "Location is mandatory")
  private String location;

  @Column
  @NotBlank(message = "Hotel address is mandatory")
  private String hotelAddress;

  @Column
  @NotBlank(message = "Hotel email is mandatory")
  private String hotelEmail;

  @Column
  @NotBlank(message = "Hotel phone number is mandatory")
  private String hotelPhone;

  @Column
  @NotNull(message = "Hotel base price is mandatory")
  private double hotelBasePrice;

  @Column
  private String imageURL;
}
