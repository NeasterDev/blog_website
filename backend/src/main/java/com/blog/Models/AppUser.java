package com.blog.Models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data // creates getters and setters
@Table(name = "user")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long id; // primary key for this table

    @Column(nullable = false, unique = true)
    private String username; // username must be unique, cannot be null

    private String password;

    // This adds a foreign key 
    @OneToMany(cascade = CascadeType.ALL)
            // What I named the foreign key ----------- the id that the fk is referencing
    @JoinColumn(name = "fk_user_id", referencedColumnName = "user_id")
    private List<BlogPost> posts;
    // do not need to manually create getters and setters
    // because of @Data from lombok
}
