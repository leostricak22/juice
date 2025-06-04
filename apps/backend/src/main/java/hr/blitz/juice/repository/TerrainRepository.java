package hr.blitz.juice.repository;

import hr.blitz.juice.domain.model.Reservation;
import hr.blitz.juice.domain.model.Terrain;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TerrainRepository extends MongoRepository<Terrain, String> {
}
