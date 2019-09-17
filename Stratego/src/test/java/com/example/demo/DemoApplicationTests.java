package com.example.demo;

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
@ContextConfiguration(classes = {DemoApplication.class})
@DataMongoTest

public class DemoApplicationTests {
	@Autowired
	private UserRepository userRepository;

	@Test
	public void contextLoads() {
	}

	@Test
	public void dbTest() {
		userRepository.deleteAll();
		userRepository.save(new User("pikapika", "abs"));
		assert userRepository.findByUserId("pikapika") != null;
	}
}
