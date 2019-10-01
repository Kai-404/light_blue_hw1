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
@Document(collection="history")
public class GameResult {
    @Id
    private String id;
    private String userId;
    private Date date;
    private String history;
    private boolean isWon;

    public GameResult(String userId, String history, boolean isWon) {
        this.userId = userId;
        this.date = new Date();
        this.history = history;
        this.isWon = isWon;
    }
}
