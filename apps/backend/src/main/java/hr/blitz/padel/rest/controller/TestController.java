package hr.blitz.padel.rest.controller;

import hr.blitz.padel.rest.dto.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {

    @GetMapping
    public ResponseEntity<MessageResponse> index() {
        return ResponseEntity.ok(MessageResponse.builder()
                .message("If you see this message, the backend works! Check if database is up and running on /test/db")
                .build());
    }

    @GetMapping("/test/db")
    public ResponseEntity<MessageResponse> testDb() {
        return ResponseEntity.ok(MessageResponse.builder()
                .message("If you see this message, the database works!")
                .build());
    }
}
