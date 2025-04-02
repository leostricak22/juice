package hr.blitz.juice.rest.dto;

import hr.blitz.juice.domain.model.Location;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class HallRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String address;
}
