package hr.blitz.juice.rest.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReservationAllUsersRequest {

    List<String> playerIds;
}
