package com.hotelbooking.pricing;

import com.hotelbooking.models.Tier;
import org.springframework.stereotype.Component;


@Component
public class CustomerLoyaltyPricing implements Pricing{

    @Override
    public double getPriceMultiplier() {

        return 0.07;
    }


    public double getPriceMultiplier(Tier tier) {
        double multiplier = 0.0;
        switch(tier) {
            case PLATINUM:
                multiplier = 0.2; //20% discount
                break;
            case GOLD:
                multiplier = 0.15; //15% discount
                break;
            case SILVER:
                multiplier = 0.1; //10% discount
                break;
            default:
                multiplier = 0.0; //no discount for regular customer
        }

        return multiplier;
    }

}
