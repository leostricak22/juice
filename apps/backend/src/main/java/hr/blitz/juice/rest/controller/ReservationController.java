package hr.blitz.juice.rest.controller;

import hr.blitz.juice.rest.dto.ReservationResponse;
import hr.blitz.juice.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/user")
    public ResponseEntity<List<ReservationResponse>> getUserReservations() {
        return ResponseEntity.ok(reservationService.getUserReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponse> getReservationById(@PathVariable String id) {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }
}
