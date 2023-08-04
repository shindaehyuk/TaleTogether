package com.kong.authtest.configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@org.springframework.context.annotation.Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
//        서버에서 돌릴 땐 주석 해제해야합니다. 로컬 사용을 위해 주석처리.
//        registry.addMapping("/**")
//                .allowedOrigins("https://i9c110.p.ssafy.io")
//                .allowedMethods("*")
//                .allowedHeaders("*")
//                .allowCredentials(true);
    }
}
