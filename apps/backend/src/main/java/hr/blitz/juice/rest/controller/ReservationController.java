package hr.blitz.juice.rest.controller;

import hr.blitz.juice.rest.dto.ReservationAllUsersRequest;
import hr.blitz.juice.rest.dto.ReservationPlayerAddRemoveRequest;
import hr.blitz.juice.rest.dto.ReservationResponse;
import hr.blitz.juice.rest.dto.UserResponse;
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

    @PostMapping("/get-all-users")
    public ResponseEntity<List<UserResponse>> getAllUsersForReservation(@RequestBody ReservationAllUsersRequest request) {
        return ResponseEntity.ok(reservationService.getAllUsersForReservation(request));
    }

    @GetMapping("/{id}/get-all-users")
    public ResponseEntity<List<UserResponse>> getAllUsersForReservation(@PathVariable String id) {
        return ResponseEntity.ok(reservationService.getAllUsersForReservation(id));
    }

    @PostMapping("/{id}/add-player/{userId}")
    public ResponseEntity<ReservationResponse> addPlayerToReservation(@PathVariable String id,
                                                                      @PathVariable String userId,
                                                                      @RequestBody ReservationPlayerAddRemoveRequest request) {
        return ResponseEntity.ok(reservationService.addPlayerToReservation(id, userId, request.getPlayerIndexSelected()));
    }

    @PostMapping("/{id}/remove-player/{userId}")
    public ResponseEntity<ReservationResponse> removePlayerFromReservation(@PathVariable String id,
                                                                           @PathVariable String userId,
                                                                           @RequestBody ReservationPlayerAddRemoveRequest request) {
        return ResponseEntity.ok(reservationService.removePlayerFromReservation(id, userId, request.getPlayerIndexSelected()));
    }
}
