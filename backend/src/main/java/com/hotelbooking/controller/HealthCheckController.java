package com.hotelbooking.controller;

import com.hotelbooking.models.Amenity;
import com.hotelbooking.service.AmenityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://team-project-epic-bytes-202.s3-website-us-west-2.amazonaws.com"}, maxAge = 40000)
public class HealthCheckController {

    @GetMapping("/health")
    public String healthCheck() {
        return "Health is OK";
    }

    @GetMapping("/")
    public String homeHealth() {
        return "Health is OK";
    }
}
