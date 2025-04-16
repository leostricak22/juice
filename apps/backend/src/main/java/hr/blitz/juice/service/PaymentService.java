package hr.blitz.juice.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import hr.blitz.juice.domain.model.stripe.PaymentRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Value("${stripe.public.key}")
    private String publicKey;

    public PaymentIntent createPaymentIntent(PaymentRequest paymentRequest) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(paymentRequest.getAmount())
                .setCurrency(paymentRequest.getCurrency())
                .setDescription(paymentRequest.getDescription())
                .addPaymentMethodType("card")
                .build();

        return PaymentIntent.create(params);
    }

    public String getPublicKey() {
        return publicKey;
    }
}