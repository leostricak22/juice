package hr.blitz.juice.rest.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;

@Data
public class TerrainAndDateRequest {

    private String terrainId;
    private Timestamp date;
    private String timeFrom;
    private String timeTo;
}
