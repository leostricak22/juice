package hr.blitz.juice.service;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.EphemeralKey;
import com.stripe.model.PaymentIntent;
import com.stripe.net.RequestOptions;
import com.stripe.param.EphemeralKeyCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import hr.blitz.juice.domain.model.stripe.PaymentRequest;
import hr.blitz.juice.rest.dto.PaymentSession;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Getter
@Service
public class PaymentService {
    @Value("${stripe.public.key}")
    private String publicKey;

    @Value("${stripe.api.key}")
    private String secretKey;

    public PaymentSession createPaymentSession(PaymentRequest paymentRequest) throws StripeException {
        Customer customer = Customer.create(Map.of(), RequestOptions.builder().setApiKey(secretKey).build());

        EphemeralKeyCreateParams ephemeralKeyParams = EphemeralKeyCreateParams.builder()
                .setCustomer(customer.getId())
                .setStripeVersion("2023-10-16")
                .build();

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(paymentRequest.getAmount())
                .setCurrency(paymentRequest.getCurrency())
                .setCustomer(customer.getId())
                .setDescription(paymentRequest.getDescription())
                .addPaymentMethodType("card")
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

         return new PaymentSession(
                paymentIntent.getClientSecret(),
                EphemeralKey.create(ephemeralKeyParams).toString(),
                customer.getId()
        );
    }

}
