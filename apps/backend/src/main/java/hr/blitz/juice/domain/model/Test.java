package hr.blitz.juice.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "test")
public class Test {

    @Id
    private String id;
    private String title;
    private String body;
    private Date date;
}
