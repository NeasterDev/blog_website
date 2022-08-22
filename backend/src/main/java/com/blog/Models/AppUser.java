package com.blog.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data // creates getters and setters for me
@Table(name = "user")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private Long id; // primary key for this table

    @Column(nullable = false, unique = true)
    private String username; // username must be unique, cannot be null

    private String password;
    // do not need to manually create getters and setters
    // because of @Data from lombok
}
