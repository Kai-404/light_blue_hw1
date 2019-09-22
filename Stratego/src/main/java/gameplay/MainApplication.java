package gameplay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"gameplay.controllers"})
public class MainApplication {

	public static void main(String[] args) {
		SpringApplication.run( MainApplication.class, args);
	}

}
