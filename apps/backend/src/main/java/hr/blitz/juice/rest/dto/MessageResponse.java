package hr.blitz.juice.rest.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageResponse {

    String message;
}
