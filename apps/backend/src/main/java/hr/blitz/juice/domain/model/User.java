package hr.blitz.juice.domain.model;

import hr.blitz.juice.audit.Auditable;
import hr.blitz.juice.domain.enumeration.CroatianCounty;
import hr.blitz.juice.domain.enumeration.RegistrationType;
import hr.blitz.juice.domain.enumeration.Role;
import jakarta.persistence.Column;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends Auditable<String> implements UserDetails {

    @Id
    private String id;
    private String name;
    private String surname;
    private String username;
    private String email;

    @Builder.Default
    @Column(name = "registration_type")
    private RegistrationType registrationType = RegistrationType.EMAIL;

    @Builder.Default
    private Boolean active = true;

    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    private String password;
    private Role role;
    private CroatianCounty location;
    private String profileImage;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }
}