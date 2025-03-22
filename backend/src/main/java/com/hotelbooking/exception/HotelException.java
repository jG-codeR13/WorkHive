package com.hotelbooking.exception;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class HotelException extends RuntimeException {
    private String reason;
}
