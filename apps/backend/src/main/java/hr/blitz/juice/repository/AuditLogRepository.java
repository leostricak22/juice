package hr.blitz.juice.repository;

import hr.blitz.juice.domain.model.AuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuditLogRepository extends MongoRepository<AuditLog, String> {
}
