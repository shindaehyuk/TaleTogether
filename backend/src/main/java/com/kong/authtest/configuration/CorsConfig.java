package com.kong.authtest.configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@org.springframework.context.annotation.Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("https://i9c110.p.ssafy.io")
//                .allowedMethods("*")
//                .allowedHeaders("*")
//                .allowCredentials(true);
    }
}
