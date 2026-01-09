package net.anassploit.gatewayservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

/**
 * Global CORS filter that ensures CORS headers are added to ALL responses,
 * including error responses (401, 403, 503, etc.)
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalCorsFilter implements WebFilter {

    @Value("${cors.allowed-origins:http://localhost:8084,http://127.0.0.1:8084}")
    private String allowedOriginsConfig;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        HttpHeaders headers = response.getHeaders();

        String origin = request.getHeaders().getOrigin();
        List<String> allowedOrigins = Arrays.asList(allowedOriginsConfig.split(","));

        // Check if the origin is allowed
        if (origin != null && allowedOrigins.contains(origin)) {
            headers.set(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, origin);
            headers.set(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
            headers.set(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
            headers.set(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "*");
            headers.set(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization, Content-Type");
            headers.set(HttpHeaders.ACCESS_CONTROL_MAX_AGE, "3600");
        }

        // Handle preflight requests
        if (request.getMethod() == HttpMethod.OPTIONS) {
            response.setStatusCode(HttpStatus.OK);
            return Mono.empty();
        }

        return chain.filter(exchange);
    }
}

