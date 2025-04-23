package hr.blitz.juice.rest.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import hr.blitz.juice.domain.enumeration.PaymentServiceEnum;
import hr.blitz.juice.domain.model.stripe.PaymentRequest;
import hr.blitz.juice.rest.dto.PaymentSession;
import hr.blitz.juice.rest.dto.ReservationRequest;
import hr.blitz.juice.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(
            @RequestBody PaymentRequest paymentRequest
    ) throws JsonProcessingException {
        try {
            System.out.println("Creating payment intent with request: " + paymentRequest.getPaymentService());
            if (paymentRequest.getPaymentService().equals(PaymentServiceEnum.RESERVATION)) {
                ObjectMapper objectMapper = new ObjectMapper();
                ReservationRequest reservation = objectMapper.convertValue(paymentRequest.getData(), ReservationRequest.class);
                String reservationJson = objectMapper.writeValueAsString(reservation);

                paymentRequest.setMetadata(Map.of("reservationData", reservationJson));
            }

            PaymentSession session = paymentService.createPaymentSession(paymentRequest);
            return ResponseEntity.ok(session);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating payment: " + e.getMessage());
        }
    }

    @PostMapping("/hosted-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestHeader("custom_amount") String amountHeader) {
        try {
            long amount = Long.parseLong(amountHeader);

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(frontendUrl + "/success")
                    .setCancelUrl(frontendUrl + "/cancel")
                    .addLineItem(SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("eur")
                                    .setUnitAmount(amount)
                                    .setProductData(
                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                    .setName("Custom Payment")
                                                    .build())
                                    .build())
                            .build())
                    .build();

            Session session = Session.create(params);
            Map<String, String> response = Map.of("url", session.getUrl());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to create session: " + e.getMessage()));
        }
    }

    @GetMapping("/config")
    public ResponseEntity<String> getPublicKey() {
        return ResponseEntity.ok(paymentService.getPublicKey());
    }
}
