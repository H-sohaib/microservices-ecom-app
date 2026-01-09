package net.anassploit.gatewayservice.config;

import org.springframework.context.annotation.Configuration;

/**
 * CORS configuration is now handled by GlobalCorsFilter.java
 * which ensures CORS headers are added to ALL responses including errors.
 */
@Configuration
public class CorsConfig {
    // CORS is now handled by GlobalCorsFilter
}

