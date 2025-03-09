package hr.blitz.juice.config.security;

import hr.blitz.juice.config.PropertiesConfig;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.service.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityBeans {

    private final JwtService jwtService;
    private final PropertiesConfig propertiesConfig;

    public SecurityBeans(JwtService jwtService, PropertiesConfig propertiesConfig) {
        this.jwtService = jwtService;
        this.propertiesConfig = propertiesConfig;
    }

    @Bean
    public AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return (HttpServletRequest _, HttpServletResponse response, Authentication authentication) -> {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userPrincipal.getUser();
            String token = jwtService.generateToken(user);

            String redirectUrl = propertiesConfig.getFrontendUrl() + "/auth/callback?token=" + token;
            response.sendRedirect(redirectUrl);
        };
    }
}