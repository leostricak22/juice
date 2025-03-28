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

import static java.util.Objects.isNull;

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
        return (HttpServletRequest request, HttpServletResponse response, Authentication authentication) -> {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userPrincipal.getUser();
            String token = jwtService.generateToken(user);

            String userAgent = request.getHeader("User-Agent").toLowerCase();
            boolean isMobile = userAgent.contains("mobile") ||
                    userAgent.contains("android") ||
                    userAgent.contains("iphone");

            String redirectUri = request.getParameter("redirect_uri");
            if (isNull(redirectUri) || redirectUri.isEmpty()) {
                redirectUri = propertiesConfig.getFrontendUrl() + "/auth/callback";
            }

            String redirectUrl = redirectUri + "?token=" + token;

            if (isMobile) {
                redirectUrl = propertiesConfig.getAppAndroidUrl()+"auth/callback?token=" + token;
            }

            response.sendRedirect(redirectUrl);
        };
    }
}