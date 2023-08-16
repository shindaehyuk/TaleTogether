package com.kong.authtest.auth.config;

import com.kong.authtest.auth.JwtAuthenticationFilter;
import com.kong.authtest.auth.JwtAuthenticationProvider;
import com.kong.authtest.auth.util.JwtTokenUtil;
import com.kong.authtest.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@EnableWebSecurity
public class AuthConfig {

    @Autowired
    ApplicationContext context;

    @Autowired
    JwtAuthenticationProvider jwtAuthenticationProvider;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // custom authenticationProvider를 authetnicationManager를 통해 Bean 주입
    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(jwtAuthenticationProvider);
        return authenticationManagerBuilder.build();
    }

    @Bean
    // join 과 login을 제외한 모든 요청에 인증(custom filter를 거치게) 사용.
    public SecurityFilterChain filterChain(
            @Autowired HttpSecurity http,
            @Autowired UserService userService,
            @Autowired JwtTokenUtil jwtTokenUtil) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
//                .antMatchers("/*")
//                .permitAll()
                .antMatchers("/users/join", "/auth/login")
                .authenticated()
                .and()
                .exceptionHandling()
                .and()
                .addFilterBefore(context.getBean(JwtAuthenticationFilter.class), LogoutFilter.class)
                .cors();
        return http.build();
    }


}
