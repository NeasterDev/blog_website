package com.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.blog.Models.BlogPost;
import com.blog.Repositories.BlogPostRepository;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    
    @Autowired
    private BlogPostRepository blogPostRepository;

    // Get all blog posts /api/blog/posts
    @GetMapping("/posts")
    public List<BlogPost> getBlogPosts() {
        return blogPostRepository.findAll();
    }

    // get a single blog post /api/blog/{post_id}
    @GetMapping("/{post_id}")
    public BlogPost getBlogPost(@PathVariable(value = "post_id") Long id) {
        return blogPostRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{post_id}")
    public void deleteBlogPost(@PathVariable(value = "post_id") Long id) {
        blogPostRepository.deleteById(id);
    }
}
