package com.blog.Filter;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.blog.auth.AuthConstants;

// This class will replace the default BasicAuthenticationFilter spring provides
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    // constructor
    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }


    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        // reads the header and looking for one called "Authorization"
        String header = req.getHeader(AuthConstants.HEADER_STRING);
        // looks for a header that starts with Bearer 
        if (header == null || !header.startsWith(AuthConstants.TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }
        // passes the request to the getAuthentication method below
        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        // 
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
      // gets the authorization header from the request
        String token = request.getHeader(AuthConstants.HEADER_STRING);
        if (token != null) {
          // comparing the secret for the JWT to our secret
          String user = JWT.require(Algorithm.HMAC512(AuthConstants.SECRET.getBytes()))
          .build()
          .verify(token.replace(AuthConstants.TOKEN_PREFIX, ""))
          .getSubject();
          
          // if the token is ok
            if (user != null) {
              // return a new UsernamePasswordAuthenticationToken with the token and any credentials (there are none in this app)
            return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
          }
          return null;
        }
        return null;
      }
}