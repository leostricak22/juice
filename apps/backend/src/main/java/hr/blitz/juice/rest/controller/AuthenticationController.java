package hr.blitz.juice.rest.controller;

import hr.blitz.juice.config.PropertiesConfig;
import hr.blitz.juice.config.security.UserPrincipal;
import hr.blitz.juice.domain.exception.AppException;
import hr.blitz.juice.domain.exception.ErrorCode;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.rest.dto.AuthenticationRequest;
import hr.blitz.juice.rest.dto.AuthenticationResponse;
import hr.blitz.juice.rest.dto.UserRequest;
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
    public ResponseEntity<User> user() {
        return ResponseEntity.ok(
                authenticationService.findUserBySessionUsername());
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


    @Autowired
    private OAuth2UserService oAuth2UserService;

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/google")
    public ResponseEntity<AuthenticationResponse> exchangeCodeForToken(@RequestBody GoogleCodeRequest request) {
        try {
            // Get the Google client registration
            ClientRegistration googleRegistration = clientRegistrationRepository.findByRegistrationId("google");

            // Simulate an OAuth2UserRequest to reuse OAuth2UserService
            OAuth2UserRequest userRequest = new OAuth2UserRequest(
                    googleRegistration,
                    exchangeCodeForAccessToken(googleRegistration, request.getCode(), request.getRedirectUri())
            );

            // Load the user using your existing OAuth2UserService
            OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
            UserPrincipal userPrincipal = (UserPrincipal) oAuth2User;

            // Generate JWT token
            String token = "jwtService.generateToken(userPrincipal)";

            AuthenticationResponse response = new AuthenticationResponse();
            response.setToken(token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new AppException(ErrorCode.UNAUTHORIZED, "Failed to exchange code: " + e.getMessage());
        }
    }

    private OAuth2AccessToken exchangeCodeForAccessToken(ClientRegistration registration, String code, String redirectUri) {
        // Use RestTemplate or an OAuth2 client to exchange the code for an access token
        RestTemplate restTemplate = new RestTemplate();
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", registration.getClientId());
        params.add("client_secret", registration.getClientSecret());
        params.add("code", code);
        params.add("grant_type", "authorization_code");
        params.add("redirect_uri", redirectUri);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                registration.getProviderDetails().getTokenUri(), // "https://oauth2.googleapis.com/token"
                params,
                Map.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> body = response.getBody();
            return new OAuth2AccessToken(
                    OAuth2AccessToken.TokenType.BEARER,
                    (String) body.get("access_token"),
                    Instant.now(),
                    Instant.now().plusSeconds(((Number) body.get("expires_in")).longValue())
            );
        } else {
            throw new AppException(ErrorCode.UNAUTHORIZED, "Failed to obtain access token");
        }
    }
}

class GoogleCodeRequest {
    private String code;
    private String redirectUri;

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getRedirectUri() { return redirectUri; }
    public void setRedirectUri(String redirectUri) { this.redirectUri = redirectUri; }
}

// Assume this exists or create it
class JwtTokenProvider {
    public String generateToken(UserPrincipal user) {
        // Implement JWT generation logic here, e.g., using JJWT
        return "jwt-token-for-" + user.getName();
    }
}