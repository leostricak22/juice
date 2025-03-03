package hr.blitz.padel.repository;

import hr.blitz.padel.domain.model.Test;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Test, String> {
}