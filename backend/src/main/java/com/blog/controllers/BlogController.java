package com.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.blog.Models.BlogPost;
import com.blog.Repositories.BlogPostRepository;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    
    @Autowired
    private BlogPostRepository blogPostRepository;

    @GetMapping("/posts")
    public List<BlogPost> getBlogPosts() {
        return blogPostRepository.findAll();
    }
}
