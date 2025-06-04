package hr.blitz.juice.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import hr.blitz.juice.rest.dto.ReservationRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Service
public class StripeWebHookService {

    @Value("${stripe.webhook.key}")
    private String endpointSecret;

    private final ObjectMapper objectMapper;
    private final ReservationService reservationService;

    @Autowired
    public StripeWebHookService(ReservationService reservationService, ObjectMapper objectMapper) {
        this.reservationService = reservationService;
        this.objectMapper = objectMapper;
        this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public ResponseEntity<String> handleStripeEvent(HttpServletRequest request) {
        System.out.println(1);
        String payload = "";
        String sigHeader = request.getHeader("Stripe-Signature");

        if (isNull(sigHeader)) {
            return ResponseEntity.badRequest().body("Stripe signature header is missing");
        }

        try {
            payload = request.getReader().lines().collect(Collectors.joining("\n"));
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("payment_intent.succeeded".equals(event.getType())) {
                try {
                    String rawJson = event.getDataObjectDeserializer().getRawJson();

                    JsonNode paymentIntentNode = this.objectMapper.readTree(rawJson);

                    JsonNode metadataNode = paymentIntentNode.get("metadata");
                    String reservationJson = null;

                    if (metadataNode != null && metadataNode.has("reservationData")) {
                        reservationJson = metadataNode.get("reservationData").asText();
                    }

                    if (reservationJson != null) {
                        ReservationRequest reservation = objectMapper.readValue(reservationJson, ReservationRequest.class);
                        reservationService.createPaidReservation(reservation);
                    }
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Failed to process PaymentIntent: " + e.getMessage());
                }
            }

            return ResponseEntity.ok("Webhook processed successfully");
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Signature verification failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing webhook: " + e.getMessage());
        }
    }
}
