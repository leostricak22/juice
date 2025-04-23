package hr.blitz.juice.rest.controller;

import hr.blitz.juice.service.StripeWebHookService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment/webhook")
public class StripeWebhookController {

    private final StripeWebHookService stripeWebHookService;

    public StripeWebhookController(StripeWebHookService stripeWebHookService) {
        this.stripeWebHookService = stripeWebHookService;
    }

    @PostMapping
    public ResponseEntity<String> handleStripeEvent(HttpServletRequest request) {
        return stripeWebHookService.handleStripeEvent(request);
    }
}
