package com.example.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class UserServices {
    @Autowired
    private UserRepository userRepository;

    /**
     * check if there is a duplicate email account
     * @param email email
     * @return return true if there is a duplicate email
     */
    public boolean checkDuplicateEmail(String email) {
        return userRepository.findByEmail(email) != null;
    }
}
