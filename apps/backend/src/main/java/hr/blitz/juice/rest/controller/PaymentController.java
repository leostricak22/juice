package hr.blitz.juice.rest.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import hr.blitz.juice.domain.model.stripe.PaymentRequest;
import hr.blitz.juice.domain.model.stripe.PaymentResponse;
import hr.blitz.juice.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentRequest);
            PaymentResponse response = new PaymentResponse(
                    paymentIntent.getClientSecret(),
                    paymentService.getPublicKey()
            );

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating payment: " + e.getMessage());
        }
    }

    @GetMapping("/config")
    public ResponseEntity<String> getPublicKey() {
        return ResponseEntity.ok(paymentService.getPublicKey());
    }
}
