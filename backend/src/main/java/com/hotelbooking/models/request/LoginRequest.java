package com.hotelbooking.models.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class  LoginRequest {

  @NotBlank
  @Size(min = 8, max = 15)
  private String username;

  @NotBlank
  @Size(min = 8, max = 15)
  private String password;
}
