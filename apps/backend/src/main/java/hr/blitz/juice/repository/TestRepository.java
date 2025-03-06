package hr.blitz.juice.repository;

import hr.blitz.juice.domain.model.Test;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Test, String> {
}