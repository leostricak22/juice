package hr.blitz.juice.rest.dto;

import lombok.Data;

@Data
public class PaymentSession {
    private String paymentIntent;
    private String ephemeralKey;
    private String customer;

    public PaymentSession(String paymentIntent, String ephemeralKey, String customer) {
        this.paymentIntent = paymentIntent;
        this.ephemeralKey = ephemeralKey;
        this.customer = customer;
    }
}
