package com.hotelbooking.repository;

import com.hotelbooking.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {}
