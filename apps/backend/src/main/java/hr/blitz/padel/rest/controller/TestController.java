package hr.blitz.padel.rest.controller;

import hr.blitz.padel.domain.model.Test;
import hr.blitz.padel.repository.TestRepository;
import hr.blitz.padel.rest.dto.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final TestRepository testRepository;

    public TestController(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @GetMapping
    public ResponseEntity<MessageResponse> index() {
        return ResponseEntity.ok(MessageResponse.builder()
                .message("If you see this message, the backend works! Check if database is up and running on /api/test/db")
                .build());
    }

    @GetMapping("/db")
    public ResponseEntity<List<Test>> testDb() {
        return ResponseEntity.ok(testRepository.findAll());
    }
}
