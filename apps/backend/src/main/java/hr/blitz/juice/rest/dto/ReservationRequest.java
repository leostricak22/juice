package hr.blitz.juice.rest.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationRequest {

    private String hallId;
    private String date;
    private String time;
}
