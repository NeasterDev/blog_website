package com.blog.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.Models.AppUser;
import com.blog.Models.BlogPost;
import com.blog.Repositories.BlogPostRepository;
import com.blog.Repositories.UserRepository;

@Service
public class MySQLUserDetailsService implements UserDetailsService {
    // Instantiates the class with Autowired
    @Autowired
    // access to our user repository
    private UserRepository userRepository; 
    @Autowired
    // Used to encode the password
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // loads a user from the database based on username
        AppUser user = userRepository.findByUsername(username);
        // if there is no user found with that username
        if (user == null) {
            // error
            throw new UsernameNotFoundException(username);
        }
        // return a new User (from org.springframework.security.core.userdetails)
        return new User(user.getUsername(), user.getPassword(), getAuthorities());
    }

    // Saving a user to the database
    public UserDetails Save(AppUser newUser) {
        // encodes the password so it doesn't get saved as plain text
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        // save the user to the repository
        AppUser savedUser = userRepository.save(newUser);
        // return a new User with the information from the user passed in
        return new User(savedUser.getUsername(), savedUser.getPassword(), getAuthorities());
    }

    public void saveBlogPost(String username, BlogPost blogPost) throws UsernameNotFoundException {
        // Find the user by the username
        AppUser foundUser = userRepository.findByUsername(username);
        // Set the current list of posts to a variable
        List<BlogPost> posts = foundUser.getPosts();
        // add the new blog post to the list of posts
        posts.add(blogPost);
        // set the posts of the user to the updated post list
        foundUser.setPosts(posts);
        // save the updated user to the db
        userRepository.save(foundUser); // this is what actually updates all the data in the database
    }
    
    // helper method to provide a list of authorities the user would have assoiciated
    // with their account
    // Gives every logged in user an authority of "ROLE_USER"
    private List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authList = new ArrayList<>();
        authList.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authList;
    }
}
