package hr.blitz.juice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import hr.blitz.juice.domain.exception.AppException;
import hr.blitz.juice.domain.model.Reservation;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.repository.HallRepository;
import hr.blitz.juice.repository.ReservationRepository;
import hr.blitz.juice.repository.TerrainRepository;
import hr.blitz.juice.repository.UserRepository;
import hr.blitz.juice.rest.dto.ReservationAllUsersRequest;
import hr.blitz.juice.rest.dto.ReservationRequest;
import hr.blitz.juice.rest.dto.ReservationResponse;
import hr.blitz.juice.rest.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final HallRepository hallRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ObjectMapper objectMapper;
    private final TerrainRepository terrainRepository;

    public Reservation createPaidReservation(ReservationRequest reservationRequest) {
        Reservation reservation = new Reservation();
        reservation.setHall(hallRepository.findById(reservationRequest.getHallId())
                .orElseThrow(() -> new AppException(404, "Hall not found")));

        if(reservationRequest.getPlayerIds().size() != 4) {
            while (reservationRequest.getPlayerIds().size() < 4) {
                reservationRequest.getPlayerIds().add(null);
            }
        }

        reservation.setUser(userRepository.findById(reservationRequest.getUserId()).orElseThrow(
                () -> new AppException(404, "User not found")));
        reservation.setDate(reservationRequest.getTerrainAndDate().getDate().toInstant());
        reservation.setTimeFrom(reservationRequest.getTerrainAndDate().getTimeFrom());
        reservation.setTimeTo(reservationRequest.getTerrainAndDate().getTimeTo());
        reservation.setPlayers(reservationRequest.getPlayerIds().stream()
                .map(playerId ->  playerId == null ? null : userRepository.findById(playerId)
                        .orElseThrow(() -> new AppException(404, "User not found")))
                .toList());
        reservation.setTerrain(terrainRepository.findById(
                reservationRequest.getTerrainAndDate().getTerrainId()).orElseThrow(() ->
                new AppException(404, "Terrain not found")));
        reservation.setPayed(true);

        return reservationRepository.save(reservation);
    }

    public List<ReservationResponse> getUserReservations() {
        String userId = jwtService.getUserFromSession().getId();
        List<Reservation> reservations = reservationRepository.findByPlayersId(userId);

        return reservations.stream()
                .map(reservation -> ReservationResponse.builder()
                        .id(reservation.getId())
                        .user(objectMapper.convertValue(reservation.getUser(), UserResponse.class))
                        .hall(reservation.getHall())
                        .date(reservation.getDate())
                        .timeFrom(reservation.getTimeFrom())
                        .timeTo(reservation.getTimeTo())
                        .players(reservation.getPlayers().stream()
                                .map(player -> objectMapper.convertValue(player, UserResponse.class))
                                .toList())
                        .terrain(reservation.getTerrain())
                        .isPayed(reservation.isPayed())
                        .build())
                .toList();
    }

    public ReservationResponse getReservationById(String id) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(id);
        if (reservationOpt.isEmpty()) {
            throw new AppException(404, "Reservation not found");
        }
        Reservation reservation = reservationOpt.get();
        return convertToResponse(reservation);
    }

    public List<UserResponse> getAllUsersForReservation(ReservationAllUsersRequest request) {
        String userId = jwtService.getUserFromSession().getId();

        return userRepository.findAll().stream()
                .filter(user -> !user.getId().equals(userId))
                .filter(user -> request.getPlayerIds().stream()
                        .filter(Objects::nonNull)
                        .noneMatch(playerId -> playerId.equals(user.getId())))
                .map(user -> objectMapper.convertValue(user, UserResponse.class))
                .toList();
    }


    public List<UserResponse> getAllUsersForReservation(String id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(
                () -> new AppException(404, "Reservation not found"));

        return userRepository.findAll().stream()
                .filter(user -> reservation.getPlayers().stream()
                        .filter(Objects::nonNull)
                        .noneMatch(player -> player.getId().equals(user.getId())))
                .map(user -> objectMapper.convertValue(user, UserResponse.class))
                .toList();
    }

    public ReservationResponse addPlayerToReservation(String id, String userId, int playerIndexSelected) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(
                () -> new AppException(404, "Reservation not found"));
        if (reservation.getPlayers().stream().anyMatch(player -> nonNull(player) && player.getId().equals(userId))) {
            throw new AppException(400, "User already added to reservation");
        }

        if (playerIndexSelected < 0 || playerIndexSelected >= reservation.getPlayers().size()) {
            throw new AppException(400, "Invalid player index selected");
        }

        reservation.getPlayers().set(playerIndexSelected, (userRepository.findById(userId).orElseThrow(
                () -> new AppException(404, "User not found"))));
        reservationRepository.save(reservation);
        return getReservationById(id);
    }

    public ReservationResponse removePlayerFromReservation(String id, String userId, int playerIndexSelected) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(
                () -> new AppException(404, "Reservation not found"));
        if (reservation.getPlayers().stream().noneMatch(player -> nonNull(player) && player.getId().equals(userId))) {
            throw new AppException(400, "User not found in reservation");
        }

        if (reservation.getUser().getId().equals(userId)) {
            throw new AppException(400, "Cannot remove the owner of the reservation");
        }

        reservation.getPlayers().set(playerIndexSelected, null);
        reservationRepository.save(reservation);
        return getReservationById(id);
    }

    public ReservationResponse getLastUserReservation() {
        User user = jwtService.getUserFromSession();
        List<Reservation> reservations = reservationRepository.findByUserId(user.getId());
        if (reservations.isEmpty()) {
            throw new AppException(404, "No reservations found for user");
        }

        Reservation lastReservation = reservations.getLast();
        return convertToResponse(lastReservation);
    }

    private ReservationResponse convertToResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .user(objectMapper.convertValue(reservation.getUser(), UserResponse.class))
                .hall(reservation.getHall())
                .date(reservation.getDate())
                .timeFrom(reservation.getTimeFrom())
                .timeTo(reservation.getTimeTo())
                .players(reservation.getPlayers().stream()
                        .map(player -> player == null ? null : objectMapper.convertValue(player, UserResponse.class))
                        .toList())
                .terrain(reservation.getTerrain())
                .isPayed(reservation.isPayed())
                .build();
    }
}