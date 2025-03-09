package hr.blitz.juice.service;

import hr.blitz.juice.config.security.UserPrincipal;
import hr.blitz.juice.domain.model.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {
    private final OAuth2Service oAuth2Service;
    private final JwtService jwtService;

    public OAuth2UserService(OAuth2Service oAuth2Service, JwtService jwtService) {
        this.oAuth2Service = oAuth2Service;
        this.jwtService = jwtService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String email = oAuth2User.getAttribute("email");
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        User user = oAuth2Service.findOrCreateUser(registrationId, email, attributes);

        String jwtToken = jwtService.generateToken(user);

        return new UserPrincipal(user, oAuth2User.getAttributes());
    }
}