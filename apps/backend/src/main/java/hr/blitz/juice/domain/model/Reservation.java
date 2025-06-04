package hr.blitz.juice.domain.model;

import hr.blitz.juice.audit.Auditable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Document(collection = "reservation")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation extends Auditable<String> {

    @Id
    private String id;
    private User user;
    private Hall hall;
    private Instant date;
    private String timeFrom;
    private String timeTo;
    private List<User> players;
    private Terrain terrain;
    private boolean isPayed;
}