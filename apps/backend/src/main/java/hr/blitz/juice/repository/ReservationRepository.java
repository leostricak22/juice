package hr.blitz.juice.repository;

import hr.blitz.juice.domain.model.Reservation;
import hr.blitz.juice.domain.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservationRepository extends MongoRepository<Reservation, String> {
}
