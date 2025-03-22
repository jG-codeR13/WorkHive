package com.hotelbooking.models.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.io.Serializable;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AmenityResponse implements Serializable {

    private String description;
    private double price;
    private Integer count;

}
