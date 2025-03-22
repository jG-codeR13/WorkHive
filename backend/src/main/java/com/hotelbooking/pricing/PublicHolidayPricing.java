package com.hotelbooking.pricing;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Component
public class PublicHolidayPricing implements Pricing {
    private final List<LocalDate> dates = new ArrayList<>();

    private void setDates(List<LocalDate> dates) {
        dates.add(LocalDate.of(2023, 1, 17)); // Martin Luther King Jr. Day
        dates.add(LocalDate.of(2022, 5, 30)); // Memorial Day
        dates.add(LocalDate.of(2022, 7, 4)); // Independence Day
        dates.add(LocalDate.of(2022, 9, 5)); // Labor Day
        dates.add(LocalDate.of(2022, 11, 11)); //Veterans Day
        dates.add(LocalDate.of(2022, 11, 24)); // Thanksgiving
        dates.add(LocalDate.of(2022, 12, 2022)); // Christmas
        dates.add(LocalDate.of(2023, 1, 1)); //New Year's Eve
    }

    //price hike in terms of percentage: 15%
    @Override
    public double getPriceMultiplier() {
        return 0.15;
    }
}
