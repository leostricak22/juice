package hr.blitz.juice.service;

import hr.blitz.juice.domain.enumeration.RegistrationType;
import hr.blitz.juice.domain.exception.AppException;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.repository.UserRepository;
import hr.blitz.juice.rest.dto.AuthenticationRequest;
import hr.blitz.juice.rest.dto.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


import java.util.HashMap;
import java.util.Map;

import static hr.blitz.juice.domain.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private void validateRegisterRequest(User user) {
        Map<String, String> errorFields = new HashMap<>();

        if (userRepository.existsByUsername(user.getUsername())) {
            errorFields.put("username", "Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            errorFields.put("email", "Email already exists");
        }

        if (!errorFields.isEmpty()) {
            throw new AppException(
                    HttpStatus.CONFLICT.value(),
                    "User already exists",
                    errorFields
            );
        }
    }

    public AuthenticationResponse register(User user, String password) {
        validateRegisterRequest(user);

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse login(AuthenticationRequest authenticationRequest) {
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new AppException(HttpStatus.UNAUTHORIZED.value(), "Invalid username or password"));

        if (!user.getRegistrationType().equals(RegistrationType.EMAIL))
            throw new AppException(HttpStatus.UNAUTHORIZED.value(), "Email registered with OAuth2");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            throw new AppException(HttpStatus.UNAUTHORIZED.value(), "Invalid username or password");
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User findUserBySessionUsername() {
        return userRepository.findByUsername(jwtService.getUsernameFromSession()).orElseThrow();
    }
}
