package hr.blitz.juice.rest.controller;

import hr.blitz.juice.rest.dto.HallRequest;
import hr.blitz.juice.service.HallService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hall")
@AllArgsConstructor
public class HallController {

    private final HallService hallService;

    @GetMapping
    public ResponseEntity<?> getAllHalls() {
        return ResponseEntity.ok(hallService.getAllHalls());
    }

    @PostMapping
    public ResponseEntity<?> createHall(@Valid @RequestBody HallRequest hallRequest) {
        return ResponseEntity.ok(hallService.saveHall(hallRequest));
    }
}
