package com.example.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Document
public class GameResult {
    @Id
    private String id;
    private String userId;
    private Date date;
    private ArrayList<Turn> turns;

    public GameResult(String userId) {
        this.userId = userId;
        this.date = new Date();
        turns = new ArrayList<>();
    }
}
