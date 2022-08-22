package com.blog.Filter;

import com.auth0.jwt.JWT;
import com.blog.Models.AppUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.*;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.blog.auth.AuthConstants.*;

// Authentication is what gives the user permission to access our site
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // Object that will create the authentication token
    private AuthenticationManager authenticationManager;
    
    // Constructor
    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    // Attempt the authentication
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException {
        try {
            // get the user from the request object
            AppUser creds = new ObjectMapper()
                    .readValue(req.getInputStream(), AppUser.class);
            // return an authentication object
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // If the authentication was successful
    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) throws IOException, ServletException {
        // Generate JSON Web Token
        String token = JWT.create()
        // sets the subject for the response to the username received by the request object
            .withSubject(((User) auth.getPrincipal()).getUsername())
        // Sets the expiration date the the current date/time + the expiration time we have set in AuthConstants
            .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        // encrypts the token with the HMAC512 algorithm using our secret
            .sign(HMAC512(SECRET.getBytes()));
        // adds the token to the header to be used by client
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    } 
    
    // If the authentication was not successful
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest req, HttpServletResponse res, AuthenticationException failed) throws IOException, ServletException {
        // Default action provided by super class 
        super.unsuccessfulAuthentication(req, res, failed);
    }
}
