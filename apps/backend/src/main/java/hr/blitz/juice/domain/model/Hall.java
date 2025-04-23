package hr.blitz.juice.domain.model;

import hr.blitz.juice.audit.Auditable;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hall")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Hall extends Auditable<String> {

    @Id
    private String id;
    private String name;
    private String address;
}
