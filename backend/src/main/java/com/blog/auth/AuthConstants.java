package com.blog.auth;

// class to hold commonly used varialbes throughout the app
public class AuthConstants {
    public static final String SECRET = "SuperVerySecretKey";
    public static final long EXPIRATION_TIME = 432_000_000;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/api/user/register";
}
