package com.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.Models.AppUser;
import com.blog.Models.BlogPost;
import com.blog.auth.MySQLUserDetailsService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private MySQLUserDetailsService userService;

    // Saves a user to the database
    @PostMapping("/register")
    public void register(@RequestBody AppUser newUser) {
        userService.Save(newUser);
    }

    // save a blog post to the database
    @PostMapping("/post")
    public void createBlogPost(@RequestBody BlogPost blogPost ) {
        // gets the current logged in username from spring
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        // save the blog post referencing the current user
        userService.saveBlogPost(username, blogPost);
    }

    @PostMapping("/logout")
    public void logout() {
        // This removes the authentication from the user
        // in the context of spring. i.e logs them out
        SecurityContextHolder.getContext().setAuthentication(null);
    }

}
