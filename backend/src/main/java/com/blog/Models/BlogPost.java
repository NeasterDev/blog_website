package com.blog.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="blogPosts")
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long post_id; // primary key for this table

    private String title;
    @Lob // sets the value in SQL database from varchar(255) to longtext
    private String content;
}
