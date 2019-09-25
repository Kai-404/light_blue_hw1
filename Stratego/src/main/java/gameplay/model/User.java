package gameplay.model;

import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Document
public class User {
    @Id
    private String id;
    private String userName;
    private String password;
    private String email;

    public  User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public User(String userName, String password, String email) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}
