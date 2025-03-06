package hr.blitz.juice.service;

import hr.blitz.juice.domain.exception.AppException;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.repository.UserRepository;
import hr.blitz.juice.rest.dto.AuthenticationRequest;
import hr.blitz.juice.rest.dto.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static hr.blitz.juice.domain.exception.ErrorCode.CONFLICT;
import static hr.blitz.juice.domain.exception.ErrorCode.UNAUTHORIZED;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(User user, String password) {
        if (userRepository.existsByUsernameOrEmail(user.getUsername(), user.getEmail()))
            throw new AppException(CONFLICT);

        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new AppException(UNAUTHORIZED));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            throw new AppException(UNAUTHORIZED);
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
