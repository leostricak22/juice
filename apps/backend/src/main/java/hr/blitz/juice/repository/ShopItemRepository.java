package hr.blitz.juice.repository;

import hr.blitz.juice.domain.model.ShopItem;
import hr.blitz.juice.domain.model.Terrain;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShopItemRepository extends MongoRepository<ShopItem, String> {
}
