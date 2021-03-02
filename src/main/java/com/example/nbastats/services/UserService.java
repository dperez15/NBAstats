package com.example.nbastats.services;

import com.example.nbastats.models.User;
import com.example.nbastats.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> listAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        return oUser.orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        oUser.ifPresent(user -> userRepository.delete(user));
    }

    public User add(User user) {
        return userRepository.save(user);
    }

}
