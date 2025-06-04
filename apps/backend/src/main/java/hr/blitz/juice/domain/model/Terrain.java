package hr.blitz.juice.domain.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "terrain")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Terrain {

    @Id
    private String id;
    private String name;
}
