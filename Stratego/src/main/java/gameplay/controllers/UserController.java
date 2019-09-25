//for test purpose only

package gameplay.controllers;

import gameplay.model.User;
import gameplay.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;

@RestController
@ComponentScan("gameplay")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public int createCourse(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) { return 1; }
        if (userRepository.findByUserName(user.getUserName()) != null) { return 2; }
        userRepository.save(user);
        return 3;
    }

    @GetMapping("/login")
    public User getUser(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password) {

        return userRepository.findByEmailAndPassword(email, password);
    }

}
