package com.hotelbooking.models.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

  @NotBlank(message = "Username is mandatory. 8-15 characters")
  @Size(min = 8, max = 15, message = "Username must be between 8-15 characters")
  private String username;

  @NotBlank(message = "Password is mandatory. ")
  @Size(min = 8, max = 15, message = "Password must be between 8-15 characters")
  private String password;

  @NotBlank(message = "First name is mandatory.")
  private String firstName;

  @NotBlank(message = "Lastname is mandatory.")
  private String lastName;

  @NotBlank(message = "Email is mandatory.")
  @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE, message = "someone@example.com")
  private String email;

  @NotBlank(message = "Phone number is mandatory")
  @Pattern(regexp = "(^$|[0-9]{10})", message = "10 digits phone number required")
  private String phone;
}
