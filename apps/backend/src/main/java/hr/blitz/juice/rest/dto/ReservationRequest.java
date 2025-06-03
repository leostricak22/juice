package hr.blitz.juice.rest.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReservationRequest {

    private String hallId;
    private TerrainAndDateRequest terrainAndDate;
    private List<Long> playerIds;
}
