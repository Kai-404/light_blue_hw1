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

    /**
     * check if there is a account with provided id and check the password
     * @param userId user id
     * @param password user password
     * @return if account not exist, return false. if password is wrong, return false
     */
    public boolean checkAccoundIdAndPassword(String userId, String password) {
        User user = userRepository.findByUserId(userId);
        if (user == null) return false;
        return user.getPassword() == password;
    }
}
