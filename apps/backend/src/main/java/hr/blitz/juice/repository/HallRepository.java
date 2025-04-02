package hr.blitz.juice.repository;

import hr.blitz.juice.domain.model.Hall;
import hr.blitz.juice.domain.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HallRepository extends MongoRepository<Hall, String> {
}