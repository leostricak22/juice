package hr.blitz.juice.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.bson.Document;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
@org.springframework.data.mongodb.core.mapping.Document(collection = "audit_log")
public class AuditLog {

    @Id
    private String id;
    private String user;
    private Date timestamp;
    private String action;
    private String entityType;
    private String entityId;
    private Object oldState;
    private Object newState;
}