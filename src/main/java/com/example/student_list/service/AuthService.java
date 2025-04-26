package com.example.student_list.service;

import com.example.student_list.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.student_list.dto.AuthResponse;
import com.example.student_list.model.User;
import com.example.student_list.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        String token = jwtService.generateToken(user);
        System.out.println(token);
        return token;
    }

    public AuthResponse register(String username, String password, String email) {
        // Check if username already exists
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // Encode password
        user.setRole("USER"); // Default role

        // Set email if your User model has this field
        if (email != null) {
            user.setEmail(email);
        }

        // Save user
        User savedUser = userRepository.save(user);

        // Generate token
        String token = jwtService.generateToken(savedUser);

        // Return response with token and user info
        return new AuthResponse(token, savedUser.getUsername(), savedUser.getRole());
    }
}