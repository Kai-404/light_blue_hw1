package com.example.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class User {
    @Id
    private String id;
    private String userId;
    private String password;
    private String email;

    public  User(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    public User(String userId, String password, String email) {
        this.userId = userId;
        this.email = email;
        this.password = password;
    }
}
