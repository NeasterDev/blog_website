package com.blog.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.Models.BlogPost;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long>{
}
