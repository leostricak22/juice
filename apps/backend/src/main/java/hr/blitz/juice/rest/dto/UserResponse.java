package hr.blitz.juice.rest.dto;

import hr.blitz.juice.domain.enumeration.CroatianCounty;
import hr.blitz.juice.domain.enumeration.RegistrationType;
import hr.blitz.juice.domain.enumeration.Role;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserResponse {

    private String id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private RegistrationType registrationType;
    private Boolean active;
    private LocalDateTime createdAt;
    private Role role;
    private CroatianCounty location;
    private String profileImage;
}
