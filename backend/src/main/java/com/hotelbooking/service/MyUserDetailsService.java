package com.hotelbooking.service;

import com.hotelbooking.models.MyUserDetails;
import com.hotelbooking.models.User;
import com.hotelbooking.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  public MyUserDetailsService(final UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
    final Optional<User> user = userRepository.findById(username);
    user.orElseThrow(() -> new EntityNotFoundException("Not found: " + username));
    return new MyUserDetails(user.get());
  }

  public Optional<User> getUserByUsername(final String username) {
    final Optional<User> user = userRepository.findById(username);
    return user;
  }

  public void save(final User user) {
    userRepository.save(user);
  }

}
