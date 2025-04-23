package hr.blitz.juice.domain.model;

import hr.blitz.juice.audit.Auditable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

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
    private LocalDate date;
    private String time;
    private boolean isPayed;
}