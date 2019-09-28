package gameplay.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@Document
public class GameResult {
    @Id
    private String id;
    private String userId;
    private Date date;
    private ArrayList<ArrayList<Map<String,String>>> boradHistory;
    private boolean isWon;

    public GameResult(String userId) {
        this.userId = userId;
        this.date = new Date();
        this.boradHistory = new ArrayList<>();
    }
}
