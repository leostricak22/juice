package hr.blitz.juice.service;

import hr.blitz.juice.config.security.UserPrincipal;
import hr.blitz.juice.domain.enumeration.RegistrationType;
import hr.blitz.juice.domain.enumeration.Role;
import hr.blitz.juice.domain.exception.AppException;
import hr.blitz.juice.domain.exception.ErrorCode;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public OAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String email = oAuth2User.getAttribute("email");

        Map<String, Object> attributes = oAuth2User.getAttributes();

        User user = findOrCreateUser(email, attributes);
        return new UserPrincipal(user, oAuth2User.getAttributes());
    }

    private User findOrCreateUser(String email, Map<String, Object> attributes) {
        return userRepository.findByEmail(email).orElseGet(() -> userRepository.save(User.builder()
                        .name((String) attributes.get("name"))
                        .email(email)
                        .username(email)
                        .role(Role.USER)
                        .registrationType(RegistrationType.GOOGLE)
                        .build()));
    }
}