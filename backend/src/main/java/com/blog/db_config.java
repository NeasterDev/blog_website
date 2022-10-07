package com.blog;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class db_config {
    
    @Bean
    public DataSource gDataSource() {
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url("jdbc:" + System.getenv("JAWSDB_URL"));
        dataSourceBuilder.username(System.getenv("JAWSDB_USERNAME"));
        dataSourceBuilder.password(System.getenv("JAWSDB_PASSWORD"));
        return dataSourceBuilder.build();
    }
}
