package com.hotelbooking.models;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Room implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column private Integer roomNumber;

  @Column (length = 15, unique = true)
  @NotBlank(message = "room type is mandatory")
  private String roomType;

  @Column
  @NotNull(message = "price is mandatory")
  private double perNightPrice;

  @Column
  @NotNull(message = "Number of beds is mandatory")
  private int beds;
}
