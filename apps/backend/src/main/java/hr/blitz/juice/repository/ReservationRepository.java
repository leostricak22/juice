package hr.blitz.juice.repository;

import hr.blitz.juice.domain.model.Reservation;
import hr.blitz.juice.domain.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends MongoRepository<Reservation, String> {

    List<Reservation> findByUserId(String userId);
    List<Reservation> findByPlayersId(String playerId);
}
