package hr.blitz.juice.rest.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class HallResponse {

    private String id;
    private String name;
    private String address;
}