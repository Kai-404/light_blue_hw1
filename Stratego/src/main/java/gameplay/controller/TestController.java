//for test purpose only

package gameplay.controller;

import gameplay.models.User;
import gameplay.models.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@ComponentScan("gameplay")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public void createCourse(@RequestBody User user) {
        userRepository.save(user);
    }

    @GetMapping("/login")
    public User getUser(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password) {

        return userRepository.findByEmailAndPassword(email, password);
    }

}
