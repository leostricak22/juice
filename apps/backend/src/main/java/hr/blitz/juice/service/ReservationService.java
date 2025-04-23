package hr.blitz.juice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import hr.blitz.juice.domain.exception.AppException;
import hr.blitz.juice.domain.exception.ErrorCode;
import hr.blitz.juice.domain.exception.ErrorResponse;
import hr.blitz.juice.domain.model.Reservation;
import hr.blitz.juice.repository.HallRepository;
import hr.blitz.juice.repository.ReservationRepository;
import hr.blitz.juice.rest.dto.ReservationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final HallRepository hallRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, HallRepository hallRepository) {
        this.reservationRepository = reservationRepository;
        this.hallRepository = hallRepository;
    }

    public Reservation createPaidReservation(ReservationRequest reservationRequest) {
        Reservation reservation = new Reservation();
        reservation.setHall(hallRepository.findById(reservationRequest.getHallId())
                .orElseThrow(() -> new AppException(404, "Hall not found")));

        // Parse ISO 8601 datetime string with timezone
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(reservationRequest.getDate());
        // Convert to LocalDate (UTC date)
        reservation.setDate(offsetDateTime.toLocalDate());

        reservation.setTime(reservationRequest.getTime());

        return reservationRepository.save(reservation);
    }
}