package hr.blitz.juice.audit;

import hr.blitz.juice.domain.model.AuditLog;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.repository.AuditLogRepository;
import hr.blitz.juice.repository.UserRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterSaveEvent;
import org.springframework.data.mongodb.core.mapping.event.BeforeDeleteEvent;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;

@Component
public class AuditLoggingListener extends AbstractMongoEventListener<Object> {

    @Autowired
    private MongoOperations mongoOperations;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private AuditorAware<String> auditorAware;

    @Autowired
    private UserRepository userRepository;

    private static final ThreadLocal<Document> oldStateHolder = new ThreadLocal<>();

    @Override
    public void onBeforeSave(BeforeSaveEvent<Object> event) {
        Object entity = event.getSource();
        if (entity instanceof Auditable auditable) {
            String id = auditable.getId();
            if (id != null) {
                String collectionName = mongoOperations.getCollectionName(entity.getClass());
                Document oldDoc = mongoOperations.findById(id, Document.class, collectionName);
                oldStateHolder.set(oldDoc);
            } else {
                oldStateHolder.set(null);
            }
        }
    }

    @Override
    public void onAfterSave(AfterSaveEvent<Object> event) {
        Object entity = event.getSource();
        if (entity instanceof Auditable auditable) {
            Document oldDoc = oldStateHolder.get();
            oldStateHolder.remove();
            Document newDoc = event.getDocument();

            String action = (oldDoc == null) ? "CREATE" : "UPDATE";
            String user = auditorAware.getCurrentAuditor().orElse("unknown");

            AuditLog auditLog = new AuditLog();
            auditLog.setUser(user);
            auditLog.setTimestamp(new Date());
            auditLog.setAction(action);
            auditLog.setEntityType(entity.getClass().getSimpleName());
            auditLog.setEntityId(auditable.getId());
            auditLog.setOldState(oldDoc);
            auditLog.setNewState(newDoc);

            auditLogRepository.save(auditLog);
        }
    }

    @Override
    public void onBeforeDelete(BeforeDeleteEvent<Object> event) {
        Class<?> entityClass = event.getType();
        if (Auditable.class.isAssignableFrom(entityClass)) {
            Document query = event.getDocument();
            org.bson.types.ObjectId id = query.getObjectId("_id");
            if (id != null) {
                String collectionName = mongoOperations.getCollectionName(entityClass);
                Document oldDoc = mongoOperations.findById(id, Document.class, collectionName);
                if (oldDoc != null) {
                    String user = auditorAware.getCurrentAuditor().orElse("unknown");

                    AuditLog auditLog = new AuditLog();
                    auditLog.setUser(user);
                    auditLog.setTimestamp(new Date());
                    auditLog.setAction("DELETE");
                    auditLog.setEntityType(entityClass.getSimpleName());
                    auditLog.setEntityId(id.toString());
                    auditLog.setOldState(oldDoc);
                    auditLog.setNewState(null);

                    auditLogRepository.save(auditLog);
                }
            }
        }
    }

    @EventListener
    @Async
    public void handleAuthenticationSuccess(AuthenticationSuccessEvent event) {
        String username = event.getAuthentication().getName();

        Optional<User> user = userRepository.findByUsername(username);
        String entityId = (user.isPresent()) ? user.get().getId() : username;

        AuditLog auditLog = new AuditLog();
        auditLog.setUser(username);
        auditLog.setTimestamp(new Date());
        auditLog.setAction("LOGIN");
        auditLog.setEntityType("User");
        auditLog.setEntityId(entityId);
        auditLog.setOldState(null);
        auditLog.setNewState(null);

        auditLogRepository.save(auditLog);
    }
}