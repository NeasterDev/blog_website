package com.blog.Models;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date date = new Date();
}
