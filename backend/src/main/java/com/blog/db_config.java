package com.blog;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class db_config {
    
    @Bean
    // public DataSource gDataSource() {
    //     DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
    //     System.out.print(System.getenv("JAWSDB_URL"));
    //     System.out.print(System.getenv("JAWSDB_USERNAME"));
    //     System.out.print(System.getenv("JAWSDB_PASSWORD"));
    //     dataSourceBuilder.url("jdbc:mysql://" + System.getenv("JAWSDB_URL"));
    //     dataSourceBuilder.username(System.getenv("JAWSDB_USERNAME"));
    //     dataSourceBuilder.password(System.getenv("JAWSDB_PASSWORD"));
    //     return dataSourceBuilder.build();
    // }
    private static Connection getConnection() throws URISyntaxException, SQLException {
        URI jdbUri = new URI(System.getenv("JAWSDB_URL"));
    
        String username = jdbUri.getUserInfo().split(":")[0];
        String password = jdbUri.getUserInfo().split(":")[1];
        String port = String.valueOf(jdbUri.getPort());
        String jdbUrl = "jdbc:mysql://" + jdbUri.getHost() + ":" + port + jdbUri.getPath();
    
        return DriverManager.getConnection(jdbUrl, username, password);
    }
    
}
