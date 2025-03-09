package hr.blitz.juice.rest.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.json.gson.GsonFactory;
import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
import hr.blitz.juice.config.PropertiesConfig;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.repository.UserRepository;
import hr.blitz.juice.rest.dto.AuthenticationRequest;
import hr.blitz.juice.rest.dto.AuthenticationResponse;
import hr.blitz.juice.rest.dto.UserRequest;
import hr.blitz.juice.service.AuthenticationService;
import hr.blitz.juice.service.JwtService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.google.api.client.http.javanet.NetHttpTransport;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ModelMapper modelMapper;
    private final PropertiesConfig propertiesConfig;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public ResponseEntity<User> user() {
        return ResponseEntity.ok(authenticationService.findUserBySessionUsername());
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody UserRequest userRequest
    ) {
        return ResponseEntity.ok(authenticationService.register(modelMapper.map(userRequest, User.class), userRequest.getPassword()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest authenticationRequest
    ) {
        return ResponseEntity.ok(authenticationService.login(authenticationRequest));
    }
}