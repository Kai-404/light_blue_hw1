package gameplay;

import com.example.model.User;
import com.example.model.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class MainApplicationTests {

    @Test
    public void contextLoads() {
    }

	@Test
	public void dbAddTest() {
		userRepository.deleteAll();
		userRepository.save(new User("pikapika", "abs"));
		assert userRepository.findByUserId("pikapika") != null;
	}

	@Test
	public void dbDeleteTest() {
		User user = userRepository.findByUserId("pikapika");
		userRepository.delete(user);
		assert userRepository.findByUserId("pikapika") == null;
	}
}
