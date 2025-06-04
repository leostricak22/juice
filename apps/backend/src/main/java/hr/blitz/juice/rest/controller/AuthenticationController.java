package hr.blitz.juice.rest.controller;

import hr.blitz.juice.config.PropertiesConfig;
import hr.blitz.juice.config.security.UserPrincipal;
import hr.blitz.juice.domain.exception.AppException;
import hr.blitz.juice.domain.exception.ErrorCode;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.rest.dto.AuthenticationRequest;
import hr.blitz.juice.rest.dto.AuthenticationResponse;
import hr.blitz.juice.rest.dto.UserRequest;
import hr.blitz.juice.rest.dto.UserResponse;
import hr.blitz.juice.service.AuthenticationService;
import hr.blitz.juice.service.JwtService;
import hr.blitz.juice.service.OAuth2UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ModelMapper modelMapper;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public ResponseEntity<UserResponse> user() {
        return ResponseEntity.ok(
                modelMapper.map(authenticationService.findUserBySessionUsername(),
                        UserResponse.class));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody UserRequest userRequest
    ) {
        return ResponseEntity.ok(authenticationService.register(
                modelMapper.map(userRequest, User.class), userRequest.getPassword()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest authenticationRequest
    ) {
        return ResponseEntity.ok(authenticationService.login(authenticationRequest));
    }
}