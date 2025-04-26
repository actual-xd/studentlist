package com.example.student_list.controller;

import com.example.student_list.dto.AuthResponse;
import com.example.student_list.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student_list.dto.LoginRequest;
import com.example.student_list.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired // Явное внедрение зависимости через конструктор
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        System.out.println(request.getUsername());
        String token = authService.login(request.getUsername(),
                request.getPassword());
        return ResponseEntity.ok(token);
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(
                request.getUsername(),
                request.getPassword(),
                request.getEmail()
        );
        return ResponseEntity.ok(response);
    }
}