package hr.blitz.juice.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
@Data
public class PropertiesConfig {
    @Value("${SECRET_KEY}")
    private String secretKey;
}