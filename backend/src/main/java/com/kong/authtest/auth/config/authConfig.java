package com.kong.authtest.auth.config;

import com.auth0.jwt.algorithms.Algorithm;
import com.kong.authtest.auth.JwtAuthenticationFilter;
import com.kong.authtest.auth.JwtAuthenticationProvider;
import com.kong.authtest.auth.JwtTokenUtil;
import com.kong.authtest.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;

import javax.servlet.FilterChain;

@Configuration
@EnableWebSecurity
public class authConfig {

    @Autowired
    ApplicationContext context;

    @Autowired
    JwtAuthenticationProvider jwtAuthenticationProvider;


    //private HttpSecurity registerJwtAuthenticationProvider(final HttpSecurity http, final UserService userService){
    //    http.getSharedObject().
    //
    //}
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws  Exception{
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(jwtAuthenticationProvider);
        return authenticationManagerBuilder.build();
    }

    //@Bean
    //public AuthenticationManager authenticationManager(
    //        AuthenticationConfiguration authenticationConfiguration
    //) throws Exception {
    //    return authenticationConfiguration.getAuthenticationManager();
    //}

    @Bean
    public SecurityFilterChain filterChain(
            @Autowired  HttpSecurity http,
            @Autowired  UserService userService,
            @Autowired JwtTokenUtil jwtTokenUtil)throws Exception{
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/users/join", "/auth/login","/").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .and()
                .addFilterBefore(context.getBean(JwtAuthenticationFilter.class), LogoutFilter.class)
                .cors();
        return http.build();
    }


}
