package com.blog.auth;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.blog.Filter.JWTAuthenticationFilter;
import com.blog.Filter.JWTAuthorizationFilter;

// Lets spring know this class is a part of the security infastructure
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    // Creates a new instance of our detail service
    private MySQLUserDetailsService mySQLUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Autowired
    // This method receives an instance of AuthenticationManagerBuilder
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        // and configuring it to the MySQLUserDetailsService as well as the BCrypt password encoder
      auth.userDetailsService(mySQLUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    // This method handles most configuration
    protected void configure(HttpSecurity http) throws Exception {
        http.cors() // activating cors to allow cross origin requests
        .and() 
        .csrf().disable() // disables a protection called Cross Site Request Forgery, is related to session based security (which we are not using)
        .authorizeRequests().antMatchers(HttpMethod.POST, AuthConstants.SIGN_UP_URL).permitAll() // this allows any user to access the /api/user/register route
        .anyRequest().authenticated() // allows all routes to be accessed by users who have been authenticated
        .and()
        .addFilter(new JWTAuthenticationFilter(authenticationManager())) // sets the authentication filter to the one we created
        .addFilter(new JWTAuthorizationFilter(authenticationManager())) // sets the authorization filter to the one we created
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // tells spring to not hold onto any user information about their session
    }

    @Bean
    // Configures the way cors is handled
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.applyPermitDefaultValues();
        corsConfig.setExposedHeaders(Arrays.asList("Authorization")); // exposes the authorization header which cors does not allow by default

        source.registerCorsConfiguration("/**", corsConfig); // registers all routes in the application to use this configuration
        return source;
    }
}
