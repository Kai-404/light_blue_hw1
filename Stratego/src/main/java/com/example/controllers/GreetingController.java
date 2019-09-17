package com.example.controllers;

import com.example.model.User;
import com.example.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@Controller
public class GreetingController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/")
    public String index() {
        userRepository.deleteAll();
        userRepository.save(new User("pikapika", "abs"));
        return "index.html";
    }
}
