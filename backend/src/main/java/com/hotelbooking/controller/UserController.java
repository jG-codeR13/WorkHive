package com.hotelbooking.controller;

import com.hotelbooking.models.BookingJournal;
import com.hotelbooking.models.User;
import com.hotelbooking.models.request.LoginRequest;
import com.hotelbooking.models.request.SignUpRequest;
import com.hotelbooking.models.response.LoginResponse;
import com.hotelbooking.security.JwtUtil;
import com.hotelbooking.service.MyUserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.Optional;

import static com.hotelbooking.constants.Constants.LOGIN_ENDPOINT;
import static com.hotelbooking.constants.Constants.SIGNUP_ENDPOINT;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://team-project-epic-bytes-202.s3-website-us-west-2.amazonaws.com"}, maxAge = 40000)
public class UserController {
  private final JwtUtil jwtUtil;

  private final MyUserDetailsService myUserDetailsService;

  private final AuthenticationManager authenticationManager;

  private final PasswordEncoder bcryptEncoder;

  public UserController(
      final JwtUtil jwtUtil,
      final MyUserDetailsService myUserDetailsService,
      final AuthenticationManager authenticationManager,
      final PasswordEncoder bcryptEncoder) {
    this.jwtUtil = jwtUtil;
    this.myUserDetailsService = myUserDetailsService;
    this.authenticationManager = authenticationManager;
    this.bcryptEncoder = bcryptEncoder;
  }

  @PostMapping(LOGIN_ENDPOINT)
  public LoginResponse login(@Valid @RequestBody final LoginRequest loginRequest) throws Exception {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              loginRequest.getUsername(), loginRequest.getPassword()));
    } catch (EntityNotFoundException e) {
      throw new EntityNotFoundException("Incorrect Username or Password");
    }

    User loggedInUser = myUserDetailsService.getUserByUsername(loginRequest.getUsername()).get();

    final String jwt = jwtUtil.generateToken(loggedInUser);
    return new LoginResponse(jwt);
  }

  @PostMapping(SIGNUP_ENDPOINT)
  public LoginResponse register(@Valid @RequestBody final SignUpRequest signUpRequest)
      throws Exception {
    Optional<User> user = myUserDetailsService.getUserByUsername(signUpRequest.getUsername());
    if (user.isEmpty()) {
      myUserDetailsService.save(
          new User(
              signUpRequest.getUsername(),
              bcryptEncoder.encode(signUpRequest.getPassword()),
              signUpRequest.getFirstName(),
              signUpRequest.getLastName(),
              signUpRequest.getPhone(),
              signUpRequest.getEmail().toLowerCase(),
              "USER"));
      User addedUser = myUserDetailsService.getUserByUsername(signUpRequest.getUsername()).get();
      final String jwt = jwtUtil.generateToken(addedUser);
      return new LoginResponse(jwt);
    } else {
      throw new EntityNotFoundException("Username already exists");
    }
  }

  @GetMapping("/users")
  public User getUserDetails() throws Exception {
    try {
      String username = SecurityContextHolder.getContext().getAuthentication().getName();
      return myUserDetailsService.getUserByUsername(username).get();
    } catch (Exception e) {
      throw new EntityNotFoundException("User not found");
    }
  }
}
