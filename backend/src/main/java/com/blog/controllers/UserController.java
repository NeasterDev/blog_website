package com.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/updatepost/{post_id}")
    public void updateBlogPost(@RequestBody BlogPost blogPost, @PathVariable(value = "post_id") String postId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.updateBlogPost(username, blogPost, postId);
    }

    @PostMapping("/logout")
    public void logout() {
        // This removes the authentication from the user
        // in the context of spring. i.e logs them out
        SecurityContextHolder.getContext().setAuthentication(null);
    }

    @GetMapping("/users")
    public List<AppUser> getUsers() {
        return userService.getUsers();
    }
    
    @GetMapping("/current")
    public AppUser getCurrentUser() {
        // gets the current logged in username from spring
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getCurrentUser(username);
    }

    @PostMapping("/compareuser")
    public boolean compareCurrentUser(@RequestBody String usernameToCompare) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return username == usernameToCompare;
    }

    // delete user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable(value = "id") Long id) {
        userService.deleteUser(id);
    }

}
