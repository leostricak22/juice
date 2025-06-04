package hr.blitz.juice.rest.dto;

import hr.blitz.juice.domain.model.Hall;
import hr.blitz.juice.domain.model.Terrain;
import hr.blitz.juice.domain.model.User;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
public class ReservationResponse {

    private String id;
    private UserResponse user;
    private Hall hall;
    private Instant date;
    private String timeFrom;
    private String timeTo;
    private List<UserResponse> players;
    private Terrain terrain;
    private boolean isPayed;
}
