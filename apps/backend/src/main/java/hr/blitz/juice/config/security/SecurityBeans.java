package hr.blitz.juice.config.security;

import hr.blitz.juice.config.PropertiesConfig;
import hr.blitz.juice.domain.enumeration.RegistrationType;
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
            try {
                UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
                User user = userPrincipal.getUser();

                String redirectUri = request.getParameter("redirect_uri");
                if (isNull(redirectUri) || redirectUri.isEmpty()) {
                    redirectUri = propertiesConfig.getFrontendUrl() + "/auth/callback";
                }

                String userAgent = request.getHeader("User-Agent").toLowerCase();
                boolean isMobile = userAgent.contains("mobile") || userAgent.contains("android") || userAgent.contains("iphone");

                if (user.getRegistrationType() == RegistrationType.EMAIL) {
                    String errorMessage = "User already registered with email";
                    String errorRedirectUrl = redirectUri + "?error=" + errorMessage;

                    if (isMobile) {
                        errorRedirectUrl = propertiesConfig.getAppAndroidUrl() + "auth/callback?error=" + errorMessage;
                    }

                    System.out.println(errorRedirectUrl);

                    response.sendRedirect(errorRedirectUrl);
                    return;
                }

                String token = jwtService.generateToken(user);

                String redirectUrl = redirectUri + "?token=" + token;
                if (isMobile) {
                    redirectUrl = propertiesConfig.getAppAndroidUrl() + "auth/callback?token=" + token;
                }

                response.sendRedirect(redirectUrl);
            } catch (Exception e) {
                String errorRedirectUrl = propertiesConfig.getFrontendUrl() + "/auth/callback?error=Authentication failed.";
                response.sendRedirect(errorRedirectUrl);
            }
        };
    }

}