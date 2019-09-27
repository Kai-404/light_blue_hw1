package gameplay.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Map;

@Document
@Data
@Getter
@Setter
public class Turn {
    @Id
    private String id;
    private ArrayList<Map<String,String>> remainingPiece;
    private ArrayList<Map<String,String>> currentBoard;

    public Turn() {
        this.remainingPiece = new ArrayList<>();
        this.currentBoard = new ArrayList<>();
    }

    public Turn(ArrayList<Map<String, String>> remainingPiece, ArrayList<Map<String, String>> currentBoard) {
        this.remainingPiece = remainingPiece;
        this.currentBoard = currentBoard;
    }
}
