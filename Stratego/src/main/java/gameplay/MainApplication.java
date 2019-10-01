package gameplay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = "gameplay.model")
@SpringBootApplication(scanBasePackages = {"gameplay.controllers", "gameplay.model","gameplay.gameEngine"})
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run( MainApplication.class, args);
    }

}
